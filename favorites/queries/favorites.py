from pydantic import BaseModel
from datetime import date
from queries.pool import *

class FavoriteIn(BaseModel):
    user_id: int
    anime_title: str
    date: date
    img_url: str

class FavoriteOut(BaseModel):
    id: int
    user_id: int
    anime_title: str
    date: date
    img_url: str

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str

class FavoriteList(BaseModel):
    favorites: list[FavoriteOut]

class FavoriteRepository:
    def delete(self, user_id: int, favorite_id: int):
        connection = get_conn()
        with connection.cursor() as db:
            db.execute(
                """
                DELETE FROM favorites
                WHERE id = %s
                """,
                [favorite_id],
            )
            return True

    def get_all(self, user_id: int = None) -> list[FavoriteOut]:
        connection = get_conn()
        with connection.cursor() as db:
            if user_id is None:
                db.execute(
                    """
                    SELECT *
                    FROM favorites
                    """
                )
            else:
                db.execute(
                    """
                    SELECT *
                    FROM favorites
                    WHERE user_id = %s
                    """,
                    [user_id]
                )
                results = []
                for row in db.fetchall():
                    anime = {}
                    for i, column in enumerate(db.description):
                        anime[column.name] = row[i]
                    results.append(anime)
                return results
    
    def create(self, favorite: FavoriteIn) -> FavoriteOut:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                result = db.execute(
                    """
                        INSERT INTO favorites
                            (user_id, anime_title, date, img_url)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                    """,
                    [favorite.user_id, favorite.anime_title, favorite.date, favorite.img_url],
                )
                id = result.fetchone()[0]
                old_data = favorite.dict()
                return FavoriteOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create"}