import { defineConfig } from "allure";

export default defineConfig({
  name: env.REPORT_NAME || "Default Allure Report",
  output: env.CI ? "./ci-reports" : "./local-reports",
  resultsDir: "allure-results",
  links: [
    { type: "tms", urlTemplate: "https://example.com/tasks/%s" },
  ]
});