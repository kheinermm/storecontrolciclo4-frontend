import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import PrivateRoute from "../auth/PrivateRouter";

import login from "../login/login";
import empleados from "../empleados/index";
import productos from "../productos/index";
import ventas from "../ventas/index";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/login"]} component={login} />
        <Route exact path="/empleados" component={empleados} />
        <Route exact path="/productos" component={productos} />
        <Route exact path="/ventas" component={ventas} />
        <Router
          path={"*"}
          component={() => (
            <h1 style={{ marginTop: 300 }}>
              404
              <br />
              Website does not exist.
            </h1>
          )}
        />
      </Switch>
    </Router>
  );
}

// function Home() {
// 	return <h2>Home</h2>;
// }
