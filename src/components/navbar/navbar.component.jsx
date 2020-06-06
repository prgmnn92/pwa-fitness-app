import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './navbar.styles.scss';

export class Navbar extends Component {
	render() {
		return (
			<nav className="nav">
				<ul className="nav__list">
					<li className="nav__item">
						<Link to="/home" className="nav__link">
							Homepage
						</Link>
					</li>
					<li className="nav__item">
						<Link to="/progress" className="nav__link">
							Progress
						</Link>
					</li>
					<li className="nav__item">
						<Link to="/statistics" className="nav__link">
							Statistics
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;
