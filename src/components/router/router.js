import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PrivateRoute from "../auth/PrivateRouter";

import login from "../login/login";
import proveedores from "../proveedores/index";
import productos from "../productos/index";
import ventas from "../ventas/index";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/login"]} component={login} />
        <Route exact path="/proveedores" component={proveedores} />
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
