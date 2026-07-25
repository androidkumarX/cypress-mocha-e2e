class RecruitmentPage {
  visitCandidates() {
    cy.visitAndWait("/web/index.php/recruitment/viewCandidates");
  }

  visitVacancies() {
    cy.visitAndWait("/web/index.php/recruitment/viewJobVacancy");
  }

  breadcrumb() {
    return cy.get(".oxd-topbar-header-breadcrumb-module");
  }

  addButton() {
    return cy.contains("button", "Add");
  }

  recordsTable() {
    return cy.get(".oxd-table");
  }

  tableRows() {
    return cy.get(".oxd-table-card");
  }

  firstName() {
    return cy.get('input[name="firstName"]');
  }

  lastName() {
    return cy.get('input[name="lastName"]');
  }

  /* OrangeHRM inputs mostly lack name attributes; reach them through their
     label inside the same input group */
  fieldByLabel(label) {
    return cy
      .contains(".oxd-input-group", label)
      .find("input, textarea")
      .first();
  }

  save() {
    return cy.get('button[type="submit"]');
  }

  toast() {
    return cy.get(".oxd-toast", { timeout: 20000 });
  }
}

module.exports = new RecruitmentPage();
