import React from "react";
import { NavLink } from "react-router-dom";
import auth0Client from "./Auth";

function Nav() {
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular">
          Popular
        </NavLink>
      </li>
      {!auth0Client.isAuthenticated() && (
        <li>
          <button onClick={auth0Client.signIn}>Sign in</button>
        </li>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label>{auth0Client.getProfile().name}</label>
          <button onClick={auth0Client.signOut}>Sign Out</button>
        </div>
      )}
    </ul>
  );
}

export default Nav;
