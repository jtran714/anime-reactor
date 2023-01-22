import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let internalToken = null;
let userdata = null;

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
      console.log(data)
      // setUser({
      //   first_name: data.account.first_name,
      //   last_name: data.account.last_name,
      //   username: data.account.username,
      //   email: data.account.email
      // })
      userdata = data.account
      internalToken = data.access_token;
      return internalToken;
    }
  } catch (e) {}
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
    } catch {}
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
        userdata
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
  const { token, setToken, user, setUser, setIsLoggedIn, userdata } = useAuthContext();
  // const { token, setToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      // console.log(token)
      // setToken(token);
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

  async function login(username, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/token`;
    console.log(url)
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    })
    // .then(res => res.json())
    // .then(data => console.log(data))
    // console.log(response)
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
      navigate("/");
      return;
    }
    let error = await response.json();
    setIsLoggedIn(false);
    return handleErrorMessage(error);
  }
    async function signup(username, password, email, firstName, lastName) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }
  return [token, login, signup, user];
}
