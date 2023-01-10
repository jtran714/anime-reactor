from fastapi import (
    Depends,
    APIRouter,
)

from queries.accounts import (
    AccountQueries
)

from models import (
    AccountIn,
    AccountOut
)

from routers import auth

router = APIRouter()

@router.post('/api/accounts', response_model=AccountOut)
def create_account(
    new_account: AccountIn,
    account_queries: AccountQueries = Depends(),
):
    new_account.password = auth.authenticator.hash_password(new_account.password)
    return account_queries.create_account(new_account)

@router.get('/api/accounts/{id}', response_model=AccountOut)
def get_account(
    id: str,
    account_queries: AccountQueries = Depends(),
):
    return account_queries.get_account_by_id(id)
