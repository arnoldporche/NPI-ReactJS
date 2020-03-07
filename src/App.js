import React from 'react';
//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/navbar/index';
import Home from './components/home/index';
import Individual from './components/individual/index';
import Organization from './components/organization/index';

function App() {
  return (
    <Router>
      <Menu />
      <Route path="/" exact component={Home} />
      <Route path="/individual" exact component={Individual} />
      <Route path="/organization" exact component={Organization} />
    </Router>
  );
}

export default App;
