import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Popular from "./Popular";
import Results from "./Results";
import history from "./history";
import Callback from "./Callback";
import SecuredRoute from "./SecuredRoute";


class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Nav />

          <Switch>
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/" component={Home} />
            <SecuredRoute exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
