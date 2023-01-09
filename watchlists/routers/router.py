
# Requiring a valid token
# In any of your endpoints that you want to secure to a logged-in user,
# use the authenticator.get_current_account_data method as an injected dependency.


# router.py
from authenticator import authenticator
from fastapi import APIRouter

router = APIRouter()


@router.post("/api/things")
async def create_thing(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    pass



# Getting the current account data, if they exist
# In any of your endpoints that you want the current account data,
# but it’s optional, use authenticator.try_get_current_account_data.

# router.py
from typing import Optional
from authenticator import authenticator
from fastapi import APIRouter

router = APIRouter()


@router.get("/api/things")
async def get_things(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
):
    if account_data:
        return personalized_list
    return general_list



# Getting tokens from HTTP-only cookies
# Let’s say that you want to use a fetch that includes your browser’s cookies.
# That way, you can use the server to decode the data that you send it.

# To do that, use the try_get_current_account_data and authenticator.cookie_name to send back a payload
# that contains the JWT for use in fetch calls to non-authenticating services, as well as the decoded account data
# from the JWT stored in the data that was returned from the get_account_data_for_cookie call when the person logged in.

# Only for fetch with included credentials This will only work
# if you set credentials: 'include' as part of the options for your fetch or RTK Query query.


# router.py

from jwtdown_fastapi.authentication import Token
from .auth import authenticator


class AccountToken(Token):
    account: AccountOut


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
