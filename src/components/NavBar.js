import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light secondary-color">
        <div class="container-fluid">
          <a class="navbar-brand" style={{'color': '#fff'}} href="/home">
            MEMORY
          </a>
          <div class="collapse navbar-collapse nav--right" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active nav--links"
                  aria-current="page"
                  href="/home"
                  style={{'color': '#fff'}}
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active nav--links"
                  aria-current="page"
                  href="/friendslist"
                  style={{'color': '#fff'}}
                >
                  Friends
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active nav--links"
                  aria-current="page"
                  href="/people"
                  style={{'color': '#fff'}}
                >
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

