const RecruitmentPage = require("../../support/pages/RecruitmentPage");

describe("Recruitment - candidates", () => {
  beforeEach(() => {
    cy.loginSession();
    RecruitmentPage.visitCandidates();
    RecruitmentPage.breadcrumb().should("contain.text", "Recruitment");
  });

  it("lists candidate records in the pipeline table", () => {
    RecruitmentPage.recordsTable().should("be.visible");
    cy.contains(".oxd-table-header", "Candidate").should("exist");
  });

  it("adds a new candidate and shows their profile", () => {
    /* Unique name per run: the shared demo is a public sandbox, so the
       suite must only ever assert on data it created itself */
    const stamp = Date.now();
    const first = "Svk";
    const last = `Candidate${stamp}`;

    RecruitmentPage.addButton().click();
    RecruitmentPage.firstName().type(first);
    RecruitmentPage.lastName().type(last);
    RecruitmentPage.fieldByLabel("Email").type(`svk.${stamp}@example.com`);
    RecruitmentPage.save().click();

    RecruitmentPage.toast().should("contain.text", "Success");
    cy.url().should("include", "/recruitment/addCandidate/");
    /* The profile shows the name in the Application Stage card */
    cy.contains(`${first} ${last}`, { timeout: 20000 }).should("be.visible");
  });
});
