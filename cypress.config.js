const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/report",
    reportFilename: "orangehrm",
    reportPageTitle: "cypress-mocha-e2e",
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
  },
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1440,
    viewportHeight: 900,
    // The shared demo can be slow; generous timeouts + retries keep the
    // suite honest about real failures instead of demo lag
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 120000,
    retries: { runMode: 2, openMode: 0 },
    video: false,
    env: {
      // Published demo credentials (shown on the login page itself)
      ORANGEHRM_USER: "Admin",
      ORANGEHRM_PASSWORD: "admin123",
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
});
