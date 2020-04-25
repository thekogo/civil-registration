import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

//Component
import Home from './components/HomeComponent'
import Success from './components/SuccessComponent'

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
