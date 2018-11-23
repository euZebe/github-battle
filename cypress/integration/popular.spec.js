describe("popular page", () => {
  it("should be available to anonymous users", () => {
    cy.visit("/popular");
    cy.get("[data-test=filters]").should("have.length", 6);
    cy.get("[data-test=popular-item]").should("have.length", 30);
  });

  it("should allow to fiiter elements", () => {
    cy.visit("/popular");
    cy.get("[data-test=filters]").last().click();
    cy.get("#loading"); // check there's a loading page
    cy.get("[data-test=popular-item]").should("have.length", 30);
  });

  it("should deal with github off", () => {
    cy.server();
    cy.route({
      method: "GET",
      url:
        "https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories",
      status: 404,
      response: { message: "Pouet" }
    });
    cy.visit("/popular");
    cy.get("[data-test=error_msg]");
  });
});
