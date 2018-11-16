import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  login = () => this.props.auth.login();

  logout = () => this.props.auth.logout();

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <header>
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/battle">Battle</Link>
          </li>
          <li>
            <Link to="/popular">Popular</Link>
          </li>
          {!isAuthenticated() && (
            <li className="log-in-out-link">
              <a onClick={this.login}>Log In</a>
            </li>
          )}
          {isAuthenticated() && (
            <li className="log-in-out-link">
              <a onClick={this.logout}>Log Out</a>
            </li>
          )}
        </nav>
      </header>
    );
  }
}

export default Nav;
