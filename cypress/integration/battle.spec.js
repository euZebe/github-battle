const playerOne = "reactjs";
const playerTwo = "angular";


describe("battle page", () => {
  it("should only allow the battle to begin when both users are settled", () => {
    cy.visit("/battle");
    cy.get("form input").first().type(playerOne);
    cy.get("form button").first().click();

    cy.get('[data-test=submit_battle]').should('not.exist');

    cy.get("form input").type(playerTwo);
    cy.get("form button").click();

    cy.get('[data-test=submit_battle]').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/battle/results?playerOneName=${playerOne}&playerTwoName=${playerTwo}`)
  });

  it("should display an error when a user in invalid");
});
