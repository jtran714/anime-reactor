import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";

function Nav() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Ani-Reactor
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
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle mr-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Creation Forms
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link dropdown-item"
                      to="/inventory/manufacturers/new"
                      id="dropdown"
                    >
                      Manufacturers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/inventory/models/new"
                      id="dropdown"
                    >
                      Offered Models
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/inventory/new"
                      id="dropdown"
                    >
                      Vehicle Inventory
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/customer/new"
                      id="dropdown"
                    >
                      Customer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/salesperson/new"
                      id="dropdown"
                    >
                      Sales Person
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/technicians/new"
                      id="dropdown"
                    >
                      Technician
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/service/new"
                      id="dropdown"
                    >
                      Service Request
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/salesrecord/new"
                      id="dropdown"
                    >
                      Sales Record
                    </NavLink>
                  </li>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle mr-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sales Department
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link dropdown-item"
                      to="/salespeople/"
                      id="dropdown"
                    >
                      Sales Team
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/customers/"
                      id="dropdown"
                    >
                      Client List
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/salesrecords/"
                      id="dropdown"
                    >
                      Sales Records
                    </NavLink>
                  </li>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle mr-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Service Department
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link dropdown-item"
                      to="/technicians/"
                      id="dropdown"
                    >
                      Technician Team
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/service/"
                      id="dropdown"
                    >
                      Service Appointments
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/service/history/"
                      id="dropdown"
                    >
                      Service History
                    </NavLink>
                  </li>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle mr-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  data-bs-display="static"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Inventory
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link dropdown-item"
                      to="/inventory/"
                      id="dropdown"
                    >
                      Automobile Inventory
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/inventory/models/"
                      id="dropdown"
                    >
                      Vehicle Models
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link dropdown-item"
                      to="/inventory/manufacturers/"
                      id="dropdown"
                    >
                      Vehicle Manufacturers
                    </NavLink>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
