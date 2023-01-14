from fastapi import (
    Depends,
    APIRouter,
    Request,
    Response,
    HTTPException,
    status
)

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
    Error,
    AccountIn,
    AccountOut,
    AccountOutWithPassword
)

from jwtdown_fastapi.authentication import Token
from typing import Union, Optional
from pydantic import BaseModel
from routers import auth

class UserForm(BaseModel):
    username: str
    password: str

class UserToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

# not_authorized = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Invalid authentication credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )

@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(auth.authenticator.try_get_current_account_data)
) -> UserToken | None:
    if account and auth.authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[auth.authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }

# @router.post('/api/accounts')
@router.post('/api/accounts', response_model=Union[UserToken, Error])
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    account_queries: AccountQueries = Depends(),
):
    hashed_password = auth.authenticator.hash_password(info.password)
    try:
        account = account_queries.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    # return True
    form = UserForm(username=info.username, password=info.password)
    token = await auth.authenticator.login(response, request, form, account_queries)
    return UserToken(account=account, **token.dict())




@router.get('/api/accounts/{user_id}', response_model=Optional[AccountOut])
def get_account(
    user_id: int,
    response: Response,
    account: dict = Depends (auth.authenticator.try_get_current_account_data),
    repo: AccountQueries = Depends(),
) -> AccountOut:
    account = repo.get_one(user_id)
    if account is None:
        response.status_code = 404
    return account
