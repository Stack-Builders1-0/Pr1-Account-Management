import React, { useState, useContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { Link, Outlet, NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../UserContext";

function NavAndHeder() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // const [isLockedin, setIsLoggedin] = useState({});

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("type_id");
    navigate("/login");
    // setIsLoggedin(false);
  };

  // Token is not present, consider it expired
  function isTokenExpired() {
    const sessionToken = localStorage.getItem("sessionToken");
    if (!sessionToken) return true;
  }

  // Check token expiration when the app loads at regular intervals
  // Check every minute
  setInterval(() => {
    if (isTokenExpired()) {
      logout();
    }
  }, 60000);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggledropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const closedropdown = () => {
    setDropDownOpen(false);
  };

  const setStyle = ({ isActive, isPending }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isActive ? "#fff" : "#f9f6f6",
      textDecoration: "none",
    };
  };

  return (
    <div className=" ">
      <div class="row flex-nowrap w-100 m-0">
        <div class="col-auto col-md-3 col-xl-2 px-sm-0 px-0 bg-dark h-100 sticky-top">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100  navstyle">
            <a href="/" class="d-flex align-items-center py-0 ">
              <div className="row  logoContainer px-1 ">
                <img src="Images/aivha-full.png" alt="Logo" />
              </div>
            </a>
            <ul
              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <NavLink to="/" style={setStyle}>
                  <i class="fs-4 bi-speedometer2"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </NavLink>
              </li>

              <li>
                <NavLink to="/transaction" style={setStyle}>
                  <div
                    className={`px-0 align-middle  ${
                      dropdownOpen ? "active" : ""
                    }`}
                    onClick={toggleDropdown}
                  >
                    <i className="fs-4 bi-cash-coin "></i>{" "}
                    <span className="ms-1 d-none d-sm-inline  ">
                      Transaction
                    </span>{" "}
                    <i
                      className={`bi bi-chevron-${
                        dropdownOpen ? "up" : "down"
                      } toggle-btn `}
                    ></i>
                  </div>
                </NavLink>
                <ul className={`collapse ${dropdownOpen ? "show" : ""} `}>
                  <li>
                    <NavLink to="/transaction" style={setStyle}>
                      <i className="fs-5 bi-plus-circle"></i>{" "}
                      <span className="ms-3 d-none d-sm-inline">Add</span>{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/edittransaction" style={setStyle}>
                      <i className="fs-5 bi-pencil"></i>{" "}
                      <span className="ms-3 d-none d-sm-inline">Edit</span>{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/editaccess" style={setStyle}>
                      <i className="fs-5 bi-person-plus"></i>{" "}
                      <span className="ms-3 d-none d-sm-inline">
                        Edit Access
                      </span>{" "}
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <NavLink to="/customer" style={setStyle}>
                  <i class="fs-4 bi-people"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline">Customers</span>{" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/employee" style={setStyle}>
                  <i class="fs-4 bi-people"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline">Employee</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/expenses" style={setStyle}>
                  <i class="fs-4 bi-cash"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline">Expenses</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/report" style={setStyle}>
                  <i class="fs-4 bi-people"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline">Report</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="col p-0 m-0 ">
          <div className="p-2 d-flex justify-content-between shadow navstyle sticky-top">
            <div></div>
            <h4 className="text">Account Management System</h4>

            <div className="dropdown ml-auto">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={dropDownOpen}
                onClick={toggledropdown}
              >
                <i className="bi bi-gear-fill"></i>
              </button>
              <ul
                className={`dropdown-menu mr-n5 ${dropDownOpen ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
                style={{ marginLeft: "-100px" }}
              >
                <li>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={closedropdown}
                  >
                    <i className="bi bi-person-fill"></i> Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClickCapture={logout}
                    className="btn btn-light dropdown-item"
                  >
                    <i className="bi bi-box-arrow-right"></i> Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default NavAndHeder;
