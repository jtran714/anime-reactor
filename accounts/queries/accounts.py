from typing import Optional, Union, List
from queries.pool import pool
from pydantic import BaseModel

class Error(BaseModel):
    message: str

class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries:
    def get_one(self, username: str) -> Optional[AccountOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , username
                            , password
                        FROM users
                        WHERE username = (%s)
                        """,
                        [username]
                    )
                    record = result.fetchone()
                    print("record", record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def get_all(self) -> Union[Error, List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , username
                            , password
                        FROM users
                        ORDER BY username;
                        """
                    )
                    return [
                        AccountOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            email=record[3],
                            username=record[4],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all accounts"}

    def create(self, account: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name, last_name, email, username, password)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.username,
                            hashed_password,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = account.dict()

                    return AccountOutWithPassword(id=id, hashed_password=hashed_password, **old_data)
                    # return AccountOutWithPassword(
                    #     id=record[0],
                    #     first_name=record[1],
                    #     last_name=record[2],
                    #     email=record[3],
                    #     username=record[4],
                    #     hashed_password=record[5],
                    #     )


        except Exception:
            return {"message": "Create did not work"}

    def account_in_to_out(self, id: int, account: AccountIn, hashed_password: str):
        old_data = account.dict()
        return AccountOutWithPassword(id=id, hashed_password=hashed_password, **old_data)

    def record_to_account_out(self, record):
        return AccountOutWithPassword(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            username=record[4],
            hashed_password=record[5],
        )
