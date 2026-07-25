# cypress-mocha-e2e

Cypress E2E suite in plain Mocha style, run against the public
[OrangeHRM demo](https://opensource-demo.orangehrmlive.com) with its
recruitment module as the core domain. API testing in that era was manual,
through GraphiQL, so this suite is deliberately UI focused.

This is a clean rebuild of the approach I used building the Cypress suite
for a job platform's seeker web app between 2022 and 2023, before the team
moved to Selenium in JavaScript as a new requirement, which I switched to
and implemented through 2024. The recruitment
domain here (candidates, vacancies, hiring pipeline) is the closest public
analog to that world. The approach:

- **Flows over pages.** Specs are named for what they verify (auth,
  candidates, vacancies), and every scenario reads top to bottom as a user
  story: log in, add a candidate, land on their profile.
- **Own your test data.** The demo is a shared public sandbox, so the suite
  only asserts on records it created itself, stamped unique per run.
- **Block the noise.** Third party analytics get intercepted and emptied
  before every visit. On a shared demo this is the difference between a
  suite that flakes daily and one that passes in 40 seconds.

## What changed since the original

- Named specs instead of TC-numbered files. TC-01 through TC-25 matched a
  test management sheet at the time, but numbers say nothing in a code review
- Page objects instead of deep inline CSS chains
- `cy.session` caches the login once per run instead of typing credentials
  in every spec
- Credentials live in config for this public demo only because they are
  published on its login page. Real credentials belong in environment
  variables and CI secrets, never in the repo
- Reports upload as CI artifacts instead of being emailed by a script

## Structure

```
cypress/
├── e2e/
│   └── ui/            # auth, candidates, vacancies
└── support/
    ├── commands.js    # visitAndWait (analytics blocking), loginSession
    └── pages/         # selectors + actions only
```

## Run it

```bash
npm install
npm test          # everything, with a mochawesome HTML report
npm run cy:open   # interactive
```
