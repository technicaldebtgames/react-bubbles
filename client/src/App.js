import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage.js';
import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute.js';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path='/bubbles' component={BubblePage} />
          <Route path="/" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
