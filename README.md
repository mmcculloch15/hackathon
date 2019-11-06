### Applitools hackathon submission

### Steps to run

1. Clone/download the repo
2. Run `npm install`
3. Run `npm test`

If you would like to see the cypress test runner, you could execute `npm run test:open` instead of `npm test`. `npm test` will run both the traditional functional tests and the Visual AI tests with applitools in a headless environment

**Note** This repo does not contain an applitools API key, which will need to be configured as an environment variable before this can be run. This can be accomplished by the following commands:

On Mac: `export APPLITOOLS_API_KEY='YOUR_API_KEY'`
On Windows: `set APPLITOOLS_API_KEY='YOUR_API_KEY'`

### Execution status

When running the tests, you should see that the functional tests (in `./cypress/integration/TraditionalTests.js`) have been updated to pass. The applitools tests should still be failing, because the baselines have not been updated. In the Applitools UI I have tagged all the bug and remark regions and have left it in a state to be actioned by a hypothetical developer/designer.

I've also added comments to the test files where appropriate, to note some limitations with the functional tests for the required scenarios.

### Running on V1

You can also switch the `baseUrl` in `./support/testData.js` if you would like to run the tests against the V1 demo application

I've also uploaded the V1 status to a separate branch `cypress_v1_tests`, if anyone would like to see how the tests function against
