from pydantic import BaseModel
import os
import pymongo
from bson.objectid import ObjectId
from datetime import datetime


dbhost = os.environ["MONGO_HOST"]
dbname = os.environ["MONGO_DATABASE"]
dbuser = os.environ["MONGO_USER"]
dbpass = os.environ["MONGO_PASSWORD"]
mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"
client = pymongo.MongoClient(mongo_str)

class FavoriteIn(BaseModel):
    name: str
    date: datetime
    img_url: str
    account_id: str


class FavoriteOut(BaseModel):
    id: str
    name: str
    date: datetime
    img_url: str


class FavoriteQueries:
    def get_favorite_id(self, id):
        db = client[dbname]
        result = db.favorites.find_one({"_id": ObjectId(id)})
        # if result:
        result["id"] = str(result["_id"])
            # if result["owner"] != owner:
            #     return None
        return result

    def create_favorite(self, data):
        db = client[dbname]
        stuff = data.dict()
        # stuff["owner"] = owner
        result = db.favorites.insert_one(stuff)
        # if result:
        favorite = self.get_favorite_id(result.inserted_id)
        # result["id"] = str(result["id"])
        return favorite

    # def get_favorites(self):
    #     db = client[dbname]
    #     filter = {"owner": owner}
    #     results = list(db.favorites.find(filter))
    #     for i in result:
    #         i["id"] = str(i["id"])
    #     return result
