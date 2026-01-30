import { defineConfig } from "allure";

const reportName = process.env.REPORT_NAME || "Default Allure Report";
const isCI = !!process.env.CI;

export default defineConfig({
    name: reportName,
    output: isCI ? "./ci-reports" : "./local-reports",
});
