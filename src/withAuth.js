import React from "react";

export default function withAuth(WrappedComponent, auth) {
  return class Authentication extends React.Component {
    render() {
      return auth.isAuthenticated() ? (
        <WrappedComponent {...this.props} />
      ) : (
        <a onClick={auth.login}>please login to access this page</a>
      );
    }
  };
}
