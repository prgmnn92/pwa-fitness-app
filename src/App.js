import React from 'react';
import './App.scss';

import Homepage from './pages/homepage/homepage.component';
import Progress from './pages/progress/progress.component';
import Statistics from './pages/statistics/statistics.component';
import Layout from './hoc/layout/layout.component';

import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Layout>
				<Switch>
					<Route path="/home">
						<Homepage />
					</Route>
					<Route path="/progress">
						<Progress />
					</Route>
					<Route path="/statistics">
						<Statistics />
					</Route>
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
