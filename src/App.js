// import $ from 'jquery';
// import Popper from 'popper.js';
// import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Container } from 'react-bootstrap';
import Login from './components/login/login';

import './App.css';

function App() {
  return (
    <div className="App">
      <Container>
        <Login/>
      </Container>
    </div>
  );
}

export default App;
