import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/login';
import Menu from './components/login/navbar/navbar';

import AppRouter from './components/router/router';

function App() {
  return (
    <div className="App">
      <Container>
        <Menu />
        <AppRouter />
        <Login />
      </Container>
 
    </div>
  );
}

export default App;
