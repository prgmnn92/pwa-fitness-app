import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { sumUpSets, sumUpWeight, getTimeString } from '../../utility';
import { postWorkout } from '../../api/workout-api';
import { resetWorkout } from '../../redux/workout/workout.actions';
import { showNavbar } from '../../redux/ui/ui.actions';

import { ReactComponent as Duration } from '../../assets/img/SVG/quick.svg';
import { ReactComponent as Sets } from '../../assets/img/SVG/check-list.svg';
import { ReactComponent as Weight } from '../../assets/img/SVG/kg-measure-weight.svg';

import './complete.styles.scss';

const Complete = ({ workoutData, time, resetWorkout, showNavbar }) => {
	const history = useHistory();
	const [ title, setTitle ] = useState('Improvisiertes Training');

	const completeWorkout = () => {
		//postworkout
		postWorgitkout(workoutData, title, time)
			.then(resetWorkout) //delete workout data
			.catch((err) => console.log(err));

		// return to homepage
		showNavbar();
		history.push('/');
	};

	return (
		<div className="complete">
			<div className="complete__header">
				<div className="complete__return" onClick={() => history.goBack()}>
					&larr;
				</div>
				<div className="complete__text">Uebersicht</div>
				<div className="complete__check" onClick={() => completeWorkout()}>
					&#10003;
				</div>
			</div>

			<input
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				placeholder={title}
				className="h2-heading"
			/>
			<div className="complete__notes">Notizen</div>
			<div className="complete__container">
				<div className="complete__small-container">
					<div className="complete__icon complete__icon--duration">
						<Duration />
					</div>
					<p>Dauer:</p>
					<p>{getTimeString(time)}</p>
				</div>
				<div className="complete__small-container">
					<div className="complete__icon complete__icon--sets">
						<Sets />
					</div>
					<p>Saetze:</p>
					<p>{sumUpSets(workoutData)}</p>
				</div>
				<div className="complete__small-container">
					<div className="complete__icon complete__icon--weight">
						<Weight />
					</div>
					<p>Gewicht:</p>
					<p>{sumUpWeight(workoutData)}</p>
				</div>
			</div>

			<div className="complete__history">
				{Object.keys(workoutData).map((key) => (
					<React.Fragment key={key + '-' + Math.random()}>
						<p key={key + '-' + Math.random()} className="complete__list-title">
							{key}
						</p>
						<ul className="complete__list">
							{workoutData[key].map(
								(set, id) =>
									set.Complete ? (
										<li key={key + '-' + id} className="complete__item">
											{set.Gewicht} kg x {set.Wiederholungen} Wdh.
										</li>
									) : null
							)}
						</ul>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	workoutData: state.workout.workoutData,
	time: state.ui.time
});

const mapDispatchToProps = (dispatch) => ({
	resetWorkout: () => dispatch(resetWorkout()),
	showNavbar: () => dispatch(showNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Complete);
