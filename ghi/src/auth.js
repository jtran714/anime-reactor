import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let internalToken = null;

export function getToken() {
  return internalToken;
}

export async function getTokenInternal() {
  const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.access_token;
      return internalToken;
    }
  } catch (e) { }
  return false;
}

function handleErrorMessage(error) {
  if ("error" in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ("__all__" in error) {
        error = error.__all__;
      }
    } catch { }
  }
  if (Array.isArray(error)) {
    error = error.join("<br>");
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ""
    );
  }
  return error;
}

export const AuthContext = createContext({
  token: null,
  setToken: () => null,
  user: null,
  setUser: () => null,
  isLoggedIn: null,
  setIsLoggedIn: () => null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
  const { token, setToken, user, setUser, setIsLoggedIn } = useAuthContext();
  // const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [setToken, token]);

  // useEffect(() => {
  //   async function fetchUsers() {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_ACCOUNTS_API_HOST}/users/current`,
  //       {
  //         method: "get",
  //         credentials: "include",
  //       }
  //     );
  //     const data = await response.json();
  //     setUser(data);
  //   }
  //   if (token) {
  //     fetchUsers();
  //   }
  // }, [setToken, token, setUser]);
  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`;
      await fetch(url, { method: "delete", credentials: "include" });
      internalToken = null;
      setToken(null);
      navigate("/");
      setIsLoggedIn(false);
    }
  }

  async function login(username, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`;
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });
    // const response2 = await fetch(
    //   `${process.env.REACT_APP_ACCOUNTS_API_HOST}/users/current`,
    //   {
    //     method: "get",
    //     credentials: "include",
    //   }
    // );
    // setUser(await response2.json());

    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      setIsLoggedIn(true);
      fetch(`${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`, {
        method: "GET",
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setUser({
            id: data.account.id,
            username: data.account.username,
            first_name: data.account.first_name,
            last_name: data.account.last_name,
            email: data.account.email
          })
        })

      navigate("/");
      return;
    }
    let error = await response.json();
    setIsLoggedIn(false);
    return handleErrorMessage(error);
  }
  return [token, login, user, logout];
}



