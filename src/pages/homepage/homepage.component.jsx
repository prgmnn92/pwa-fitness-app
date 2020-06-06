import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './homepage.styles.scss';

export class Homepage extends Component {
	render() {
		return (
			<div className="homepage">
				<div className="week-view">
					<ul className="week-view__list">
						<li className="week-view__item">
							<div className="week-view__text">Mo.</div>
							<div className="week-view__number">01</div>
						</li>
						<li className="week-view__item">
							<div className="week-view__text">Di.</div>
							<div className="week-view__number week-view__day--number--active">02</div>
						</li>
						<li className="week-view__item">
							<div className="week-view__text">Mi.</div>
							<div className="week-view__number">03</div>
						</li>
						<li className="week-view__item">
							<div className="week-view__text">Do.</div>
							<div className="week-view__number">04</div>
						</li>
						<li className="week-view__item">
							<div className="week-view__text">Fr.</div>
							<div className="week-view__number">05</div>
						</li>
						<li className="week-view__item">
							<div className="week-view__text">Sa.</div>
							<div className="week-view__number">06</div>
						</li>
						<li className="week-view__item">
							<div className="week-view__text">So.</div>
							<div className="week-view__number">07</div>
						</li>
					</ul>
				</div>
				<button className="btn">
					<Link to="#">
						<div className="btn__icon">ICON</div>
						<span>Plan erstellen</span>
					</Link>
				</button>

				<button className="btn">
					<Link to="#">
						<div className="btn__icon">ICON</div>
						<span>Schnellstart</span>
					</Link>
				</button>
			</div>
		);
	}
}

export default Homepage;
