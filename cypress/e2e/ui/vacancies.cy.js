const RecruitmentPage = require("../../support/pages/RecruitmentPage");

describe("Recruitment - vacancies", () => {
  beforeEach(() => {
    cy.loginSession();
    RecruitmentPage.visitVacancies();
    RecruitmentPage.breadcrumb().should("contain.text", "Recruitment");
  });

  it("lists open vacancies", () => {
    RecruitmentPage.recordsTable().should("be.visible");
    RecruitmentPage.tableRows().should("have.length.at.least", 1);
    cy.contains(".oxd-table-header", "Vacancy").should("exist");
  });

  it("opens a vacancy record into its edit form", () => {
    RecruitmentPage.tableRows().first().find("i.bi-pencil-fill").click();

    cy.url().should("include", "/recruitment/addJobVacancy/");
    cy.contains("h6", "Edit Vacancy").should("be.visible");
    RecruitmentPage.fieldByLabel("Vacancy Name")
      .invoke("val")
      .should("match", /\S/);
  });
});
