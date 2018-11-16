describe("battle page", () => {
  it("should not be available to anonymous users", () => {
    cy.visit('/battle')
  });
});
