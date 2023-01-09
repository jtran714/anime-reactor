from fastapi import APIRouter, Depends, Response, status
from typing import Union
from models.watchlists import WatchlistIn, WatchlistOut, ErrorMsg
from queries.watchlists import WatchlistQueries
from authenticator import authenticator

# async def create_thing(
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):

router = APIRouter()
# router.include_router(authenticator.router)

@router.post("/api/watchlists", response_model=Union[WatchlistOut, ErrorMsg])
def create_watchlist(
    new_watchlist : WatchlistIn,
    watchlist_quaries: WatchlistQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
    ):
    return watchlist_quaries.create_watchlist(new_watchlist)

@router.get('/api/watchlists/{id}', response_model=WatchlistIn)
def get_watchlist(
    id: str,
    watchlist_quaries: WatchlistQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    # specify user role if needed
    # if account['username'] == 'superuser':
    #   return watchlist_quaries.get_watchlist_by_id(id)
    # else:
    #     raise HTTPException(status_code=404, detail="item not found")
    return watchlist_quaries.get_watchlist_by_id(id)


@router.get('/api/watchlists', response_model=list[WatchlistOut])
def get_watchlists(
    watchlist_quaries: WatchlistQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    return watchlist_quaries.get_watchlist_by_id(id)
