import "cypress-mochawesome-reporter/register";
import "./commands";

/* The demo app throws its own frontend errors now and then; they are not
   what this suite tests */
Cypress.on("uncaught:exception", () => false);
