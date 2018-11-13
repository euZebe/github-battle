describe("home page", () => {
  it("should contain a link to battle", () => {
    cy.visit("/");
    cy.get("[data-test=home_container] a").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/battle`);
  });
});
