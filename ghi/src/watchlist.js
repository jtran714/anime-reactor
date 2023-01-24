import { useState, useEffect } from "react";
import { useAuthContext } from "./auth";


export default function Watchlist() {
    const { token } = useAuthContext();
    const [anime, setAnime] = useState([]);
    const [decodedUser, setDecodedUser] = useState("")
    const [submitted, setSubmitted] = useState(false);

    function parseJwt(token) {
      console.log(token);
      let base64Url = token.split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const variable = JSON.parse(jsonPayload);
      setDecodedUser(variable.account);
    }

    useEffect(() => {
      if (token !== null) {
        parseJwt(token)
      }
    }, [token]);

    useEffect(() => {
      console.log(decodedUser, "============decodedUser============");
        async function getWatchlist() {
            const watchlistsURL = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${decodedUser.id}`;
            const fetchConfig = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(watchlistsURL, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setAnime(data.watchlists);
            }
        }
        if (decodedUser) {
            getWatchlist();
        }
    }, [token, decodedUser, submitted]);

    const removeWatchlist = async (watchlist_id) => {
        const removeURL = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${decodedUser.id}/${watchlist_id}`;
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
        <h1>Anime in your watchlist</h1>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Anime Title</th>
              <th>Air Date</th>
              <th>Picture</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {anime.map((watchlist) => {
              return (
                <tr key={watchlist.id}>
                  <td>{watchlist.title}</td>
                  <td>{watchlist.date}</td>
                  <td>
                    <img
                      src={watchlist.img_url}
                      alt={watchlist.title}
                      width="50%"
                      height="50%"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeWatchlist(watchlist.id)}
                    >
                      Delete
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
