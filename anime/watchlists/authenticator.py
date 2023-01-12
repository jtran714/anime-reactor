# authenticator.py
import os
from datetime import timedelta
from jwtdown_fastapi.authentication import Authenticator


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts,
    ):
        pass
        # Use your repo to get the account based on the
        # username (which could be an email)

    def get_account_getter(
        self,
        accounts,
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account):
        # Return the encrypted password value from your
        # account object
        # return account.hashed_password
        pass

    def get_account_data_for_cookie(self, account):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, account

# two_hours = timedelta(hours=2)

authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
# authenticator = MyAuthenticator(os.environ["SIGNING_KEY"],exp=two_hours,)
