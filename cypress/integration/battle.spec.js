const playerOne = "angular";
const playerTwo = "vuejs";

describe("battle page", () => {
  it("should require logging in", () => {
    cy.visit("/battle");
    cy.get("[data-test=please_login_msg]");
  });

  it('should allow to start a battle when logged in', () => {
    cy.login();
    cy.visit('/battle');
    cy.get('form');
    cy.get('[data-test=username]').first().type(playerOne);
    cy.get('button[type=submit]').first().click();
    cy.get('[data-test=username]').first().type(playerTwo);
    cy.get('button[type=submit]').first().click();

    cy.get('[data-test=submit_battle]').click(); // starting battle
    cy.url().should('eq', `${Cypress.config().baseUrl}/battle/results?playerOneName=${playerOne}&playerTwoName=${playerTwo}`);
    cy.get('[data-test=submitted_player]').should('have.length', 2);
    // Note: checking the way a player card is displayed is none of the e2e business
  });
});
