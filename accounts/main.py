from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
# from queries.accounts import AccountQueries
# from pydantic import BaseModel
from routers import accounts, auth


app = FastAPI()
app.include_router(auth.authenticator.router)
app.include_router(accounts.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# class AccountIn(BaseModel):
#     email: str
#     password: str

# class AccountOut(BaseModel):
#     id: str
#     email: str

# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "year": 2022,
#             "month": 12,
#             "day": "9",
#             "hour": 19,
#             "min": 0,
#             "tz:": "PST"
#         }
#     }


# @app.post('/api/accounts', response_model=AccountOut)
# def create_account(
#     new_account: AccountIn,
#     account_queries: AccountQueries = Depends(),
# ):
#     return account_queries.create_account(new_account)
