### Applitools hackathon submission

### Steps to run

1. Clone/download the repo
2. Run `npm install`
3. Run `npm test`

If you would like to see the cypress test runner, you could execute `npm run test:open` instead of `npm test`. `npm test` will run both the traditional functional tests and the Visual AI tests with applitools in a headless environment

**Note** this repo does not contain an applitools API key, which will need to be configured as an environment variable before this can be run. This can be accomplished by running:

On mac: `export APPLITOOLS_API_KEY='YOUR_API_KEY'`
On windows: `set APPLITOOLS_API_KEY='YOUR_API_KEY'`

You can also switch the `baseUrl` in `./support/testData.js` if you would like to run the tests against the V1 demo application
