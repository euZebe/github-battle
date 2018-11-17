// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import auth0 from "auth0-js";

Cypress.Commands.add("fake login", () => {
  // https://github-battle.eu.auth0.com/authorize
  // TODO
});

Cypress.Commands.add("login", () => {
  return new Promise((resolve, reject) => {
    const webAuth = new auth0.WebAuth({
      domain: "github-battle.eu.auth0.com",
      clientID: "6sAEtshipxmIMcpoPE4ze2JhJS3Qm0GK",
      responseType: "token id_token"
    });

    webAuth.client.login(
      {
        realm: "Username-Password-Authentication",
        username: "mi@ou.cat", //FIXME externalize this in a fixture
        password: "&a1A&a1A",
        audience: "https://github-battle.eu.auth0.com/api/v2/", // Get this from https://manage.auth0.com/#/apis and your api, use the identifier property
        scope: "openid email profile"
      },
      (err, authResult) => {
        // Auth tokens in the result or an error
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.localStorage.setItem("access_token", authResult.accessToken);
          window.localStorage.setItem("id_token", authResult.idToken);
          window.localStorage.setItem(
            "expires_at",
            authResult.expiresIn * 1000 + new Date().getTime()
          );
          resolve();
        } else {
          reject(err);
        }
      }
    );
  });
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
