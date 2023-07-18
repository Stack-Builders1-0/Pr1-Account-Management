import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { Link, Outlet, NavLink } from "react-router-dom";

function NavAndHeder() {
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
      color: isActive ? "#1a51a3" : "#0D6EFD",
      textDecoration: "none",
    };
  };

  return (
    <div className="container-fluid dashboard">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
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
                    className={`nav-link px-0 align-middle ${
                      dropDownOpen ? "active" : ""
                    }`}
                    onClick={toggledropdown}
                  >
                    <i className="fs-4 bi-cash-coin"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline">Transaction</span>{" "}
                    <i
                      className={`bi bi-chevron-${
                        dropDownOpen ? "up" : "down"
                      } toggle-btn`}
                    ></i>
                  </div>
                </NavLink>
                <ul className={`collapse ${dropDownOpen ? "show" : ""}`}>
                  <li>
                    <NavLink
                      to="/transaction"
                      style={setStyle}
                      onClick={closedropdown}
                    >
                      <i className="fs-5 bi-plus-circle"></i>{" "}
                      <span className="ms-3 d-none d-sm-inline">Add</span>{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/edittransaction"
                      style={setStyle}
                      onClick={closedropdown}
                    >
                      <i className="fs-5 bi-pencil"></i>{" "}
                      <span className="ms-3 d-none d-sm-inline">Edit</span>{" "}
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
                <Link
                  to="employee"
                  data-bs-toggle="collapse"
                  class="nav-link px-0 align-middle"
                >
                  <i class="fs-4 bi-people"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline">Employee</span>
                </Link>
              </li>

              <li>
                <a
                  href="#submenu6"
                  data-bs-toggle="collapse"
                  class="nav-link px-0 align-middle"
                >
                  <i class="fs-4 bi-file-earmark-bar-graph"></i>{" "}
                  <span class="ms-1 d-none d-sm-inline">Report</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col p-0 m-0">
          <div className="p-2 d-flex justify-content-between shadow">
            <div></div>
            <h4 className="">Account Management System</h4>
            <div className="dropdown ml-auto">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={toggleDropdown}
              >
                <i className="bi bi-gear-fill"></i>
              </button>
              <ul
                className={`dropdown-menu mr-n5 ${dropdownOpen ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
                style={{ marginLeft: "-100px" }}
              >
                <li>
                  <Link to="/profile" className="dropdown-item">
                    <i className="bi bi-person-fill"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="dropdown-item">
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </Link>
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
