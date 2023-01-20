from psycopg import connect
import os

DATABASE_URL = os.environ["DATABASE_URL"]

def get_conn():
    kwargs = {"autocommit": True}
    return connect(conninfo=DATABASE_URL, **kwargs)