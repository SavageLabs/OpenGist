import React from 'react';
import View from "./components/View"
import EditView from "./components/EditView"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import './App.css';

function App() {
  return (
    <Router>
     <Switch>
     <Route path={"/view/:id"} component={View} />
      <Route path={"/"} component={EditView} exact/>
      <Route component={() => <Redirect to={"/"} />} />
     </Switch>
    </Router>
  );
}

export default App;
