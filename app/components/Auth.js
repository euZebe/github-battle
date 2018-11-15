import auth0 from "auth0-js";

class Auth {
  auth0 = new auth0.WebAuth({
    domain: "github-battle.eu.auth0.com",
    clientID: "6sAEtshipxmIMcpoPE4ze2JhJS3Qm0GK",
    redirectUri: "http://localhost:8080/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  getProfile = () => this.profile;

  getIdToken = () => this.idToken;

  isAuthenticated = () => new Date().getTime() < this.expiresAt;

  signIn = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () =>
    new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        resolve();
      });
    });

  signOut = () => {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  };
}

const auth0Client = new Auth();

export default auth0Client;
