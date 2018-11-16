import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Nav extends Component {
  login = () => this.props.auth.login();

  logout = () => this.props.auth.logout();

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <header>
        <ul className="nav">
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
            <li>
              <a onClick={this.login}>Log In</a>
            </li>
          )}
          {isAuthenticated() && (
            <li>
              <a onClick={this.logout}>Log Out</a>
            </li>
          )}
        </ul>
      </header>
    );
  }
}

export default Nav;
