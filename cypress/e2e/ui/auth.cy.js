const LoginPage = require("../../support/pages/LoginPage");

describe("Authentication", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("logs in with valid credentials and lands on the dashboard", () => {
    LoginPage.username().type(Cypress.env("ORANGEHRM_USER"));
    LoginPage.password().type(Cypress.env("ORANGEHRM_PASSWORD"), { log: false });
    LoginPage.submit().click();

    cy.url().should("include", "/dashboard");
    LoginPage.breadcrumb().should("contain.text", "Dashboard");
    LoginPage.userMenu().should("be.visible");
  });

  it("rejects invalid credentials with an error message", () => {
    LoginPage.username().type("Admin");
    LoginPage.password().type("definitely-wrong", { log: false });
    LoginPage.submit().click();

    LoginPage.errorAlert().should("contain.text", "Invalid credentials");
    cy.url().should("include", "/auth/login");
  });

  it("logs out cleanly from the user menu", () => {
    LoginPage.username().type(Cypress.env("ORANGEHRM_USER"));
    LoginPage.password().type(Cypress.env("ORANGEHRM_PASSWORD"), { log: false });
    LoginPage.submit().click();
    LoginPage.userMenu().click();

    cy.contains("a", "Logout").click();
    cy.url().should("include", "/auth/login");
    cy.get('input[name="username"]').should("be.visible");
  });
});
