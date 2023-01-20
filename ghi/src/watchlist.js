import React from "react";
import { useEffect, useState } from "react";

const Watchlist = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // First argument: state variable
  // Second argument: function

  const user = {
    id: "1",
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlN2UyYmJlMS05Njc5LTQ1NWQtOTQ4MC0zYTJjZTBmM2ExZTUiLCJleHAiOjE2NzQxNjAxMDIsInN1YiI6InN0cmluZyIsImFjY291bnQiOnsiaWQiOjEsImZpcnN0X25hbWUiOiJzdHJpbmciLCJsYXN0X25hbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsInVzZXJuYW1lIjoic3RyaW5nIn19.LxWLhQ0cPDvoSghMEdg2cUU1BWhbi9fNLaVZqNi3yZ0";

  useEffect(() => {
    async function getWatchlist() {
      const watchlistURL = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/api/watchlists/${user.id}`;
      const fetchConfig = {
        method: "GET",
        headers: {
          Authentication: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(watchlistURL, fetchConfig);
      if (response.ok) {
        const data = response.json();
        setWatchlists(data.watchlists);
      } else {
        console.log("fetch error");
      }
    }
    getWatchlist();
  }, [watchlists, user.id, submitted]);

  const delWatchlist = async (watchlist) => {
    const delURL = `${process.env.REACT_APP_WATCHLISTS_API_HOST}/watchlists/${user.id}/${watchlist.id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(delURL, fetchConfig);
    if (response.ok) {
      setWatchlists([...watchlist]);
      setSubmitted(true);
    }

    // function parseJwt (token) {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));

    //     return JSON.parse(jsonPayload);
    // }

    return (
      <>
        <h1>Anime in Your Watch List</h1>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Anime Title</th>
              <th>Date</th>
              <th>Picture</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {watchlists.map((watchlist) => {
              return (
                <tr key={watchlist.id}>
                  <td>{watchlist.title}</td>
                  <td>{watchlist.name}</td>
                  <td>
                    <img
                      src={watchlist.img_url}
                      alt={watchlist.title}
                      width="20%"
                      height="20%"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => delWatchlist(watchlist.id)}
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
  };
};
export default Watchlist;
