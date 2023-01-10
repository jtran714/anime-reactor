from pydantic import BaseModel



class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str

class AccountOut(BaseModel):
    id: str
    username: str

class Account(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    username: str
    password: str
