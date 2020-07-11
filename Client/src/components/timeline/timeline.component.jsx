import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import 'moment/locale/de';

import { showTimeline } from '../../redux/workout/workout.actions';

import './timeline.styles.scss';

class Timeline extends React.Component {
	componentDidMount() {
		const year = moment().format('YYYY');
		const value = moment().format('dd');
		const month = moment().format('mm');
		this.props.showTimeline(year, {
			value,
			month
		});
	}

	render() {
		const { timeline, date } = this.props;
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
	}
}

const mapStateToProps = (state) => ({
	timeline: state.workout.timeline,
	date: state.workout.date
});

const mapDispatchToProps = (dispatch) => ({
	showTimeline: (year, day) => dispatch(showTimeline(year, day))
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
