import React from "react";
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

function App() {
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

export default App;
