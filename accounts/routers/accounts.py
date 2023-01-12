from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)

from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel

from models import (
    AccountIn,
    AccountOut
)

from routers import auth

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(auth.authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and auth.authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[auth.authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }



@router.post('/api/accounts', response_model=AccountToken | HttpError )
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = auth.authenticator.hash_password(info.password)
    try:
        account = repo.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await auth.authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())

@router.get('/api/accounts/{account_id}', response_model=AccountOut | None)
async def get_account(
    account_id: str,
    request: Request,
    account: dict = Depends(auth.authenticator.try_get_current_account_data),
    repo: AccountQueries = Depends(),
) -> AccountOut | None:
    if account and auth.authenticator.cookie_name in request.cookies:
        user = repo.get_user_by_id(account_id)
        return user
    return None
