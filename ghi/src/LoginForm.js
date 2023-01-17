import React from "react";
import { useState } from "react";
import { useAuthContext, useToken } from "./auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [, login] = useToken();
  const { isLoggedIn } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await login(username, password);
    if (error) {
      isLoggedIn(false);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="row login-style">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4 login-style">
            <h1>Welcome back!</h1>
            <form onSubmit={handleSubmit} id="login-form" method="POST">
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="form-control"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-control"
                />
                <label htmlFor="password">Password</label>
              </div>

              <button type="submit" className="btn btn-funky-moon">
                Log In
              </button>
            </form>
            {isLoggedIn === false && (
              <div className="alert" id="invalid-credentials">
                <p>Wrong credentials. Please try again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
