describe("popular page", () => {
  beforeEach(() => {
    cy.visit("/popular");
  });
  it("should be available to anonymous users", () => {
    cy.get("[data-test=filters]").should("have.length", 6);
    cy.get("[data-test=popular-item]").should("have.length", 30);
  });

  it("should allow to fiiter elements", () => {
    cy.get("[data-test=filters]").last().click();
    cy.get("#loading"); // check there's a loading page
    cy.get("[data-test=popular-item]").should("have.length", 30);
  });
});
