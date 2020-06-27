import React from "react";
import { connect } from "react-redux";
import "./App.scss";

import Homepage from "./pages/homepage/homepage.component";
import Progress from "./pages/progress/progress.component";
import Statistics from "./pages/statistics/statistics.component";
import PlanCreator from "./pages/plan-creator/plan-creator.component";
import QuickStart from "./pages/quick-start/quick-start.component";
import Exercise from "./pages/exercise/exercise.component";
import Complete from "./pages/complete/complete.component";

import Layout from "./hoc/layout/layout.component";

import { Route, Switch } from "react-router-dom";
import { getWorkouts } from "./api/workout-api";
import { saveWorkouts } from "./redux/workout/workout.actions";

class App extends React.Component {
  componentDidMount() {
    const { saveWorkouts } = this.props;

    getWorkouts().then((data) => saveWorkouts(data));
  }

  render() {
    return (
      <div className="App">
        <svg
          width="248"
          height="219"
          viewBox="0 0 248 219"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="triangle"
        >
          <path
            opacity="0.3"
            d="M113.437 216.791C114.606 218.711 117.394 218.711 118.563 216.791L247.458 5.05999C248.675 3.06081 247.236 0.5 244.895 0.5H-12.8954C-15.2359 0.5 -16.675 3.0608 -15.4579 5.05998L113.437 216.791Z"
            fill="#449DD1"
            fill-opacity="0.6"
          />
        </svg>

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
            <Route path="/plan-creator">
              <PlanCreator />
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
  saveWorkouts: (workouts) => dispatch(saveWorkouts(workouts)),
});

export default connect(null, mapDispatchToProps)(App);
