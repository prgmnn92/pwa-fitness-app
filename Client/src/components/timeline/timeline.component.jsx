import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import 'moment/locale/de';

import './timeline.styles.scss';

const Timeline = ({ timeline, date }) => {
	let newDate = date.split('/');
	let mom = moment(newDate[2] + newDate[1] + newDate[0]);
	mom.locale('de');

	if (!mom.isValid()) {
		mom = moment();
	}

	return (
		<div className="timeline">
			<div className="timeline__date">{mom.format('dddd, DD. MMMM')}</div>
			{!!timeline ? (
				timeline.map((workout) => {
					return (
						<React.Fragment key={workout._id}>
							<div key={workout._id + 1} className="timeline__content">
								{workout.title}
							</div>
						</React.Fragment>
					);
				})
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => ({
	timeline: state.workout.timeline,
	date: state.workout.date
});

export default connect(mapStateToProps)(Timeline);
