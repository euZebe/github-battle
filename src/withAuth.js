import React from "react";

export default function withAuth(WrappedComponent, auth) {
  return class Authentication extends React.Component {
    render() {
      return auth.isAuthenticated() ? (
        <WrappedComponent {...this.props} />
      ) : (
        <a className='warning-msg' onClick={auth.login} data-test="please_login_msg">please login to access this page</a>
      );
    }
  };
}
