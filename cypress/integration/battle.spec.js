
describe("battle page", () => {
  it("should require logging in", () => {
    cy.visit("/battle");
    cy.get("[data-test=please_login_msg]");
  });

  it('should allow to start a battle when logged in', () => {
    cy.login();
    cy.visit('/battle');
    cy.get('form');
    cy.fixture("players").then(({ playerOne, playerTwo })=> {
      cy.get('[data-test=username]').first().type(playerOne);
      cy.get('button[type=submit]').first().click();
      cy.get('[data-test=username]').first().type(playerTwo);
      cy.get('button[type=submit]').first().click();

      cy.get('[data-test=submit_battle]').click(); // starting battle
      cy.url().should('match', /\/battle\/results/);
    });
  });

  it('shoud display an error when asking for an invalid user', () => {
    const mockedUser = 'reactjs';
    cy.server();
    cy.route({
      method: 'GET',
      url: /api.github.com\/users/,
      status: 404,
      delay: 1000,
      response: {}
    });
    cy.login();
    cy.visit('/battle');
    cy.get('[data-test=username]').first().type(mockedUser);
    cy.get('button[type=submit]').first().click();
    cy.get('[data-test=username]').first().type(mockedUser);
    cy.get('button[type=submit]').first().click();

    cy.get('[data-test=submit_battle]').click(); // starting battle
    cy.get('[data-test=error_msg]');
  })
});
