import pymongo
import os
from bson import ObjectId
from models import Account, AccountIn, AccountOut
from pymongo.errors import DuplicateKeyError
from .client import Queries

# dbuser = os.environ['MONGO_USER']
# dbpass = os.environ['MONGO_PASSWORD']
# dbhost = os.environ['MONGO_HOST']
# mongodb = os.environ['MONGO_DATABASE']
# mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"
# client = pymongo.MongoClient(mongo_str)

class DuplicateAccountError(ValueError):
    pass

class AccountQueries(Queries):
    DB_NAME = "anime"
    COLLECTION = "accounts"
    def create_account(self, info: AccountIn, hashed_password: str) -> Account:
        props = info.dict()
        props["password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return Account(**props)
        # db = client[mongodb]
        # result = db.accounts.insert_one(new_account.dict())
        # account = self.get_account_by_id(result.inserted_id)
        # return account

    def get_account_by_id(self, id) -> AccountOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        del props["password"]
        return AccountOut(**props)
        # db = client[mongodb]
        # result = db.accounts.find_one({ "_id": ObjectId(id) })
        # result['id'] = str(result['_id'])
        # return result


    def get_account_by_username(self, username: str) -> Account:
        props = self.collection.find_one({"username": username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return Account(**props)
        # db = client[mongodb]
        # result = db.accounts.find_one({ "username": username })
        # result['id'] = str(result['_id'])
        # return result
