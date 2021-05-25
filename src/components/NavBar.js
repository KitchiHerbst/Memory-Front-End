import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const NavBar = (props) => {
  return (
    <div>
      <nav
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
                  <Link to='/people'>Find Friends</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
