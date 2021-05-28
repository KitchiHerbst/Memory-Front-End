import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const NavBar = (props) => {
  return (
    <div>
      {/* <nav
        id="nav-bar"
        className="navbar sticky-top navbar-expand-lg navbar-light"
        style={{ "background-color": "#e6f5e6" }}
      >
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/friendslist">Friends</Link>
              </li>
              <li>
                  <Link to='/people'>Search</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <nav class="navbar navbar-expand-lg navbar-light secondary-color">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            MEMORY
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="/friendslist"
                >
                  Friends
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/people">
                  Search
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
