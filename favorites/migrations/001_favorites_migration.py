steps = [
    [
        """
        CREATE TABLE favorites (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            anime_title VARCHAR(250) NOT NULL,
            date VARCHAR(100) NOT NULL,
            img_url VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE favorites;
        """
    ]
]