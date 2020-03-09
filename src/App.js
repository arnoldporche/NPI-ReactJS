import React from 'react';
//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/navbar/index';
import Home from './components/home/index';
import Individual from './components/individual/index';
import IndividualView from './components/individual/view';
import Organization from './components/organization/index';
import OrganizationView from './components/organization/view';

function App() {
  return (
    <Router>
      <Menu />
      <Route path="/" exact component={Home} />
      <Route path="/individual" exact component={Individual} />
      <Route path="/individual/view/:id" exact component={IndividualView} />
      <Route path="/organization" exact component={Organization} />
      <Route path="/organization/view/:id" exact component={OrganizationView} />
    </Router>
  );
}

export default App;
