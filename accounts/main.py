from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import accounts, auth

app = FastAPI()
app.include_router(accounts.router)
app.include_router(auth.authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        # "https://catjj.gitlab.io/ani-reactor",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
