import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Pages/Home";
import Callback from "./Callback/Callback";
import Auth from "./Auth/Auth";
import Popular from "./Pages/Popular";
import Battle from "./Pages/battle/Battle";
import Results from "./Pages/battle/Results";
import withAuth from "./withAuth";

const auth = new Auth();

const handleAuthentication = ({ history, location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication().then(() => history.goBack());
  }
};

const Routes = () => {
  return (
    <Router>
      <div>
        <Nav auth={auth} />

        <main className="container">
          <Switch>
            <Route path="/" exact component={Home} />
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
            <Route render={() => <div>Page not found</div>} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
