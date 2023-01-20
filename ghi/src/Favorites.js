import { useState, useEffect } from "react";
import { useAuthContext } from "./auth";


export default function Favorites() {
    const { token, user } = useAuthContext();
    const [anime, setAnime] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        async function getFavoriteAnime() {
            const favoritesURL = `${process.env.REACT_APP_FAVORITES_API_HOST}/favorites/${user.id}`;
            const fetchConfig = {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(favoritesURL, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setAnime(data.anime);
                setSubmitted(false);
            }
        }
        if (user) {
            getFavoriteAnime();
        }
    }, [token, user, setAnime, submitted]);

    const removeFavorite = async (favorite) => {
        const removeURL = `${process.env.REACT_APP_FAVORITES_API_HOST}/favorites/${user.id}/${favorite.id}`;
        const fetchConfig = {
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
        const response = await fetch (removeURL, fetchConfig);
        if (response.ok) {
            setAnime([...anime]);
            setSubmitted(true);
        }
    };

    return (
      <>
        <h1>Anime in your favorites</h1>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Anime Title</th>
              <th>Date</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {anime.map((favorite) => {
              return (
                <tr key={favorite.id}>
                  <td>{favorite.title}</td>
                  <td>{favorite.name}</td>
                  <td>
                    <img
                      src={favorite.img_url}
                      alt={favorite.title}
                      width="20%"
                      height="20%"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFavorite(favorite.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
}