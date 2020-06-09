import React, { Component } from 'react';

import Calendar from '../../components/calendar/calendar.component';
import Timeline from '../../components/timeline/timeline.component';

import './progress.styles.scss';

export class Progress extends Component {
	render() {
		return (
			<div className="progress">
				<Calendar />
				<Timeline />
			</div>
		);
	}
}

export default Progress;
