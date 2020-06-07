import React, { Component } from "react";

import { Link } from "react-router-dom";

import { ReactComponent as Home } from "../../assets/img/SVG/home.svg";
import { ReactComponent as Calendar } from "../../assets/img/SVG/calendar.svg";
import { ReactComponent as Stats } from "../../assets/img/SVG/stats-dots.svg";

import "./navbar.styles.scss";

export class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/home" className="nav__link">
              <Home className="nav__icon" />
              <span className="nav__text">Homepage</span>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/progress" className="nav__link">
              <Calendar className="nav__icon" />
              <span className="nav__text">Progress</span>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/statistics" className="nav__link">
              <Stats className="nav__icon" />
              <span className="nav__text">Statistics</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
