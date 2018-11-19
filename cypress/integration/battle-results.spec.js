describe("battle results page", () => {
  it("should require logging in", () => {
    cy.visit("/battle/results?playerOneName=angular&playerTwoName=vuejs");
    cy.get("[data-test=please_login_msg]");
  });

  it('should display results when logged in', () => {
    cy.login();
    cy.visit('/battle/results?playerOneName=angular&playerTwoName=vuejs');
    cy.get('[data-test=submitted_player]').should('have.length', 2);
    // Note: checking the way a player card is displayed is none of the e2e business
  });
});
