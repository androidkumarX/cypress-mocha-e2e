/* Blocks third-party analytics before visiting: the single biggest source
   of flake and slowness on shared demo sites */
Cypress.Commands.add("visitAndWait", (url) => {
  cy.intercept(/google-analytics|googletagmanager|hotjar|fbevents/, (req) => {
    req.reply("");
  });
  cy.visit(url);
});

/* Session-cached login: the UI login runs once, every spec after that
   restores the cookie jar instead of typing credentials again */
Cypress.Commands.add("loginSession", () => {
  cy.session("admin", () => {
    cy.visitAndWait("/web/index.php/auth/login");
    cy.get('input[name="username"]').type(Cypress.env("ORANGEHRM_USER"));
    cy.get('input[name="password"]').type(Cypress.env("ORANGEHRM_PASSWORD"), {
      log: false,
    });
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });
});
