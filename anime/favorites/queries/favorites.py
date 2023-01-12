from pydantic import BaseModel
import os
import pymongo
from bson.objectid import ObjectId
from datetime import datetime


dbhost = os.environ["MONGOHOST"]
dbname = os.environ["MONGODATABASE"]
dbuser = os.environ["MONGOUSER"]
dbpass = os.environ["MONGOPASSWORD"]
mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"
client = pymongo.MongoClient(mongo_str)

class FavoriteIn(BaseModel):
    name: str
    date: datetime
    img_url: str


class FavoriteOut(BaseModel):
    id: str
    name: str
    date: datetime
    img_url: str


class FavoriteQueries:
    def get_favorite_id(self, favorite_id, owner):
        db = client[dbname]
        result = db.favorites.find_id({"_id": ObjectId(favorite_id)})
        if result:
            result["id"] = str(result["_id"])
            if result["owner"] != owner:
                return None
        return result

    def create_favorite(self, data, owner):
        db = client[dbname]
        stuff = data.dict()
        stuff["owner"] = owner
        result = db.favorites.insert_one(stuff)
        if result.inserted:
            result = self.get_favorite_id(result.inserted, owner)
            result["id"] = str(result["id"])
            return result

    def get_favorites(self, owner):
        db = client[dbname]
        filter = {"owner": owner}
        result = list(db.favorites.find(filter))
        for i in result:
            i["id"] = str(i["id"])
        return result
