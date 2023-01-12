# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries
from models import AccountOut, Account
from queries.sessions import SessionQueries

class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get_account_by_username(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: Account) -> str:
        # Return the encrypted password value from your
        # account object
        return account.password

    def get_account_data_for_cookie(self, account: Account) -> AccountOut:
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        # del account.password
        return account.username, AccountOut(**account.dict())


    def get_session_getter(self, session_repo: SessionQueries = Depends()):
        return session_repo

    async def jti_created(self, jti, account, session_repo):
        session_repo.create(jti, account)

    async def jti_destroyed(self, jti, session_repo):
        session_repo.delete(jti)

    async def validate_jti(self, jti, session_repo):
        return session_repo.get(jti) is not None

authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
