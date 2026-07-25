class LoginPage {
  visit() {
    cy.visitAndWait("/web/index.php/auth/login");
  }

  username() {
    return cy.get('input[name="username"]');
  }

  password() {
    return cy.get('input[name="password"]');
  }

  submit() {
    return cy.get('button[type="submit"]');
  }

  errorAlert() {
    return cy.get(".oxd-alert-content-text");
  }

  breadcrumb() {
    return cy.get(".oxd-topbar-header-breadcrumb-module");
  }

  userMenu() {
    return cy.get(".oxd-userdropdown-tab");
  }
}

module.exports = new LoginPage();
