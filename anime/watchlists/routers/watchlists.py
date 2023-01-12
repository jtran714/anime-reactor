# from fastapi import APIRouter, Depends, Response, status
# from typing import Union
# from watchlists.models.watchlists import WatchlistIn, WatchlistOut, ErrorMsg
# from watchlists.queries.watchlists import WatchlistQueries
# from watchlists.authenticator import authenticator


# router = APIRouter()
# # router.include_router(authenticator.router)

# @router.post("/api/watchlists", response_model=Union[WatchlistOut, ErrorMsg])
# def create_watchlist(
#     watchlist : WatchlistIn,
#     watchlist_queries: WatchlistQueries = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
#     ):
#     return watchlist_queries.create_watchlist(watchlist)

# @router.get('/api/watchlists/{id}', response_model=WatchlistOut)
# def get_watchlist(
#     id: str,
#     watchlist_queries: WatchlistQueries = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
# ):
#     # specify user role if needed
#     # if account['username'] == 'superuser':
#     #   return watchlist_queries.get_watchlist_by_id(id)
#     # else:
#     #     raise HTTPException(status_code=404, detail="item not found")
#     return watchlist_queries.get_watchlist_by_id(id)

# #500
# @router.get('/api/watchlists', response_model=list[WatchlistOut])
# def get_watchlists(
#     watchlist_queries: WatchlistQueries = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
# ):
#     return watchlist_queries.get_watchlist_by_id(account['id'])

# # update not ready
# @router.put('/api/watchlists/{id}', response_model=Union[WatchlistOut, ErrorMsg])
# def update_watchlist(
#     id: str,
#     new_watchlist : WatchlistIn,
#     watchlist_queries: WatchlistQueries = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
# ):
#     return watchlist_queries.update_watchlist(watchlist_queries,new_watchlist)

# # delete not ready
# @router.delete('/api/watchlists/{id}')
# def delete_watchlist(
#     id: str,
#     watchlist_queries: WatchlistQueries = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
# ):
#     return {
#     "Selected watchlist is deleted": True
# }
