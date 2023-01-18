import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";
import { useToken, useAuthContext } from "./auth";

function LogoutButton() {
  const [, , logout] = useToken();
  return (
    <div className="buttons">
      <button onClick={logout} className="btn btn-outline-primary">
        Log out
      </button>
    </div>
  );
}

function Nav() {
  const { token } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Ani Reactor
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Sign Up
              </NavLink>
            </li>
          </ul>
          <div className="navbar-end">
            <div className="navbar-item">
              {token ? (
                <LogoutButton />
              ) : (
                <NavLink className="btn btn-primary" to="/login">
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
