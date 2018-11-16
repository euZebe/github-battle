import React from "react";
import { Route, Router } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home/Home";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import history from "./history";
import Popular from "./Pages/Popular";
import Battle from "./Pages/Battle";
import Results from "./Pages/Results";
import withAuth from "./withAuth";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div className="container">
        <Route path="/" render={props => <Nav auth={auth} {...props} />} />
        <Route path="/home" render={props => <Home auth={auth} {...props} />} />
        <Route path="/battle" exact component={withAuth(Battle, auth)} />
        <Route path="/battle/results" component={withAuth(Results, auth)} />
        <Route path="/popular" component={Popular} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
