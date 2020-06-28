import React from 'react';

import { ReactComponent as Duration } from '../../assets/img/SVG/quick.svg';
import { ReactComponent as Sets } from '../../assets/img/SVG/check-list.svg';
import { ReactComponent as Weight } from '../../assets/img/SVG/kg-measure-weight.svg';

import './overview.styles.scss';

const Overview = () => (
	<div className="overview">
		<div className="overview__text">Du hast zuletzt vor 2 Tagen Improvisiertes Training trainiert.</div>
		<div className="overview__container">
			<ul className="overview__list">
				<li className="overview__item">
					<div className="overview__icon">
						<Duration />
					</div>
					<span>54</span>
					<p>Minuten</p>
				</li>
				<li className="overview__item">
					<div className="overview__icon">
						<Sets />
					</div>
					<span>10</span>
					<p>Saetze</p>
				</li>
				<li className="overview__item">
					<div className="overview__icon">
						<Weight />
					</div>
					<span>2000</span>
					<p>Kilo</p>
				</li>
			</ul>
		</div>
	</div>
);

export default Overview;
