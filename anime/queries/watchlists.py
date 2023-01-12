import os
import pymongo
from bson import ObjectId


dbuser = os.environ['MONGO_USER']
dbpass = os.environ['MONGO_PASSWORD']
dbhost = os.environ['MONGO_HOST']
mongodb= os.environ['MONGO_DATABASE']

mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"
client =pymongo.MongoClient(mongo_str)

class WatchlistQueries:
    def create_watchlist(self, watchlist):
        db = client[mongodb]
        new_watchlist = watchlist.dict()
        # new_watchlist['owner'] = owner
        result = db.watchlists.insert_one(new_watchlist)
        watchlist = self.get_watchlist_by_id(result.inserted_id)
        return watchlist

#Need to work on owner prop
    def get_watchlist_by_id(self, id):
        db = client[mongodb]
        result = db.watchlists.find_one({ "_id": ObjectId(id) })
        print(result) # findOne returns a single document
        if result:
            result['id'] = str(result['_id'])
            return result

    # def get_watchlists(self, owner):
    #     db = client[mongodb]
    #     results = list.db.watchlists.find({"owner":owner})
    #     for res in results:
    #             res['id'] = str(res['_id'])
    #     return results

    def get_watchlists(self, id):
        db = client[mongodb]
        print(db)
        results = list.db.watchlists.find({"id":id})
        print(results)
        for res in results:
                res['id'] = str(res['_id'])
        return results
