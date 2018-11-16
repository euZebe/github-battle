import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./App.css";

class Nav extends Component {
  goTo = route => this.props.history.replace(`/${route}`);

  login = () => this.props.auth.login();

  logout = () => this.props.auth.logout();

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <ul className="nav">
        <li>
          <a onClick={() => this.goTo("home")}>Home</a>
        </li>
        <li>
          <a onClick={() => this.goTo("battle")}>Battle</a>
        </li>
        <li>
          <a onClick={() => this.goTo("popular")}>Popular</a>
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
    );
  }
}

export default Nav;
