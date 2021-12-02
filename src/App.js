// import $ from 'jquery';
// import Popper from 'popper.js';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Container } from 'react-bootstrap';

import Menu from './components/navbar/navbar'

import './App.css';

import AppRouter from './components/router/router';

function App() {
  return (
    <div className="App">
      <Menu />
      <Container>
        <AppRouter />
      </Container>
    </div>
  );
}

export default App;
