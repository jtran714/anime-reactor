import os
import pymongo
from bson import ObjectId


dbuser = os.environ['MONGOUSER']
dbpass = os.environ['MONGOPASSWORD']
dbhost = os.environ['MONGOHOST']
mongodb= os.environ['DATABASE']

mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"
client =pymongo.MongoClient(mongo_str)

class WatchlistQueries:
    def create_watchlist(self, new_watchlist):
        print("\n ====== \n")
        print("hitting WatchlistQueries")
        print("\n ====== \n")
        db = client[mongodb]
        result = db.watchlists.insert_one(new_watchlist.dict())
        watchlist = self.get_watchlist_by_id(result.inserted_id)
        return watchlist

    def get_watchlist_by_id(self, id):
        db = client[mongodb]
        result = db.watchlists.find_one({ "_id": ObjectId(id) })
        print(result) # findOne returns a single document
        result['id'] = str(result['_id'])
        return result

    def get_watchlists(self):
        db = client[mongodb]
        results = list.db.watchlists.find()
        for res in results:
                res['id'] = str(res['_id'])
        return results
