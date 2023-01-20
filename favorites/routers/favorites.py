from fastapi import APIRouter, Depends
from queries.favorites import *
from authenticator import authenticator

router = APIRouter()



@router.get("/favorites/{user_id}", response_model=FavoriteList)
def get_all_for_user(
    user_id: int,
    repo: FavoriteRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return {"favorites": repo.get_all(user_id)}

@router.post("/favorites/{user_id}", response_model=FavoriteOut)
def create_favorite(
    favorite: FavoriteIn,
    repo: FavoriteRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    if account_data:
        return repo.create(favorite)

@router.delete("/favorites/{user_id}/{favorite_id}")
def delete_favorite(
    user_id: int,
    favorite_id: int,
    repo: FavoriteRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    if account_data:
        return repo.delete(user_id, favorite_id)