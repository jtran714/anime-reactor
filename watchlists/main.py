from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers.watchlists import router

app = FastAPI()
app.include_router(router)

origins = [
    os.environ.get("CORS_HOST", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
