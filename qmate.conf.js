const QmateService = require("@sap_oss/wdio-qmate-service");

exports.config = {

  baseUrl: "https://sdk.openui5.org/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon",
    
  maxInstances: 1,

  logLevel: 'warn',
  
  specs: [
    [
      "./specs/createNewOrder.spec.js"
    ]
  ],

  framework: 'mocha',
  mochaOpts: {
    timeout: 15000,
    bail: true
  },

  services: [[QmateService], ['chromedriver']],

  afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
  },
  
  capabilities: [{
    browserName: "chrome",
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: [
        "--output-/dev/null",
        "--log-level-3",
        "--no-sandbox",
        "--disable-search-engine-choice-screen",
        // "--incognito",
        "--ignore-certificate-errors",
        "--window-size-1920,1200",
        "--whitelisted-ios",
        "--disable-dev-shm-usage",
        // "--headless",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-infobars",
        "--disable-extensions",
        "--disable-logging",
        "--lang-en-US"
      ]
    }
  }]
}