from auth import authenticator
from fastapi import APIRouter, Depends, Response
from queries.favorites import FavoriteOut, FavoriteIn, FavoriteQueries
from typing import Optional


router = APIRouter()

@router.post("/favorites", response_model=FavoriteOut)
def create_favorite(
    favorite: FavoriteIn,
    favorite_queries: FavoriteQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    return favorite_queries.create_favorite(favorite, account["id"])


@router.get("/favorites", response_model=FavoriteOut)
def get_favorites(
    favorite_queries: FavoriteQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    return FavoriteOut(favorite=favorite_queries.get_all(account["id"]))


@router.get("/favorite/{favorite_id}", response_model=Optional[FavoriteOut])
def favorite_detail(
    favorite_id: str,
    res: Response,
    favorite_queries: FavoriteQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
):
    favorite = favorite_queries.get_one(favorite_id, account["id"])
    if favorite is None:
        res.status_code = 404
    return favorite
