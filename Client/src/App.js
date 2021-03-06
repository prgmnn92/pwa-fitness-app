import React from 'react';
import { connect } from 'react-redux';
import './App.scss';

import Homepage from './pages/homepage/homepage.component';
import Progress from './pages/progress/progress.component';
import Statistics from './pages/statistics/statistics.component';
import QuickStart from './pages/quick-start/quick-start.component';
import Exercise from './pages/exercise/exercise.component';
import Complete from './pages/complete/complete.component';

import Layout from './hoc/layout/layout.component';

import { Route, Switch } from 'react-router-dom';
import { getWorkouts } from './api/workout-api';
import { saveWorkouts } from './redux/workout/workout.actions';

class App extends React.Component {
	componentDidMount() {
		const { saveWorkouts } = this.props;

		getWorkouts().then((data) => saveWorkouts(data));
	}

	render() {
		return (
			<div className="App">
				<Layout>
					<Switch>
						<Route exact path="/">
							<Homepage />
						</Route>
						<Route path="/progress">
							<Progress />
						</Route>
						<Route path="/statistics">
							<Statistics />
						</Route>
						<Route path="/quick-start">
							<QuickStart />
						</Route>
						<Route path="/exercise/:exerciseName">
							<Exercise />
						</Route>
						<Route path="/complete">
							<Complete />
						</Route>
					</Switch>
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	saveWorkouts: (workouts) => dispatch(saveWorkouts(workouts))
});

export default connect(null, mapDispatchToProps)(App);
