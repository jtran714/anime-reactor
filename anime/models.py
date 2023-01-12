from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value

class AccountOut(BaseModel):
    id: str
    username: str

class WatchlistIn(BaseModel):
    account_id:str
    username:str
    mal_id:str
    watching:Optional[str]

class WatchlistOut(WatchlistIn):
    id: str

class ItemIn(BaseModel):
    id: str
    mal_id: str
    title: str
    synopsis: str
    image_url: str | None

class ItemOut(ItemIn):
    id:str
    mal_id: str
    title: str
    synopsis: str
    img_url: str | None

class ErrorMsg(BaseModel):
    message:str



# class WatchlistIn(BaseModel):
#     id:str
#     date:str
#     watching:Optional[str]


# class WatchlistOut(BaseModel):
#     id:str
#     date: str
#     watching:Optional[str]
# # Using str for now. May be using list later?


# class ErrorMsg(BaseModel):
#     message:str
