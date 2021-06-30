import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Job from './components/Job';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/jobs/:jobId' component={Job} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  )
}

export default Routes;