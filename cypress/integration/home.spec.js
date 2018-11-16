describe("home page", () => {
  it("should be available to anonymous users", () => {
    cy.visit("/home");
    cy.get("[data-test=home_container] > a").should("have.attr", "href", "/battle"); // TODO: replace <a/> by a button => be resilient to dom changes
  });
});
