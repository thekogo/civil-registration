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
import List from './components/ListComponent'

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
