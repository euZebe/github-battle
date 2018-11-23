describe("battle results page", () => {
  it("should require logging in", () => {
    cy.visit("/battle/results?playerOneName=anyone&playerTwoName=someoneelse");
    cy.get("[data-test=please_login_msg]");
  });

  it('should display results when logged in', () => {
    cy.login();
    cy.fixture("players").then(({ playerOne, playerTwo }) => {
      cy.visit(`/battle/results?playerOneName=${playerOne}&playerTwoName=${playerTwo}`);
      cy.get('[data-test=submitted_player]').should('have.length', 2);
      // Note: checking the way a player card is displayed is none of the e2e business
    })
  });
});
