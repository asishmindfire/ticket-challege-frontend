import React from "react";
import "./Navbar.css";
import { Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <header className="text-bg-dark" id="navbar_style">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Avatar
              src="https://randomuser.me/api/portraits/men/51.jpg"
              alt="Jane Doe"
            />
            <div id="avatar_name">Asish Sharma</div>

            <ul
              className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
              id="navbar_ul"
            >
              <li>
                <a href="/" className="nav-link px-3" id="navbar_link">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-3" id="navbar_link">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-3" id="navbar_link">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-3" id="navbar_link">
                  Contact Us
                </a>
              </li>
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                id="searchbar"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>
            <button type="button" className="btn btn-warning">
              Search
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
