const BasePage = require('./base.page');

class ManageProductsPage extends BasePage {

    initialProductComboBoxSelector = {
        "elementProperties": {
            "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
            "metadata": "sap.m.CheckBox",
            "bindingContextPath": "/Products(1)"
      }
    };

    initialProductStock = {
        "elementProperties": {
            "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
            "metadata": "sap.m.ObjectNumber",
            "bindingContextPath": "/Products(1)",
            "id": "__number2-__clone3",
            "number": "*"
        }
    };

    orderButtonSelector = {
        "elementProperties": {
            "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
            "metadata": "sap.m.Button",
            "type": "Accept"
        }
    };

    async openPage() {
        await super.openPage("https://sdk.openui5.org/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon");
    }

    async waitForPageOpened() {
        await util.browser.waitUntil(
            async () => await ui5.element.isVisible(this.initialProductComboBoxSelector), { 
                timeout: 10000, 
                timeoutMsg: "Manage Products page did not open entirely within the expected time" 
            }
        );
    };

    async selectInitialProduct() {
        await ui5.userInteraction.click(this.initialProductComboBoxSelector);
    };

    async getInitialProductStock() {
        const value = await ui5.control.getProperty(this.initialProductStock, "number");
        return Number(value);
    };

    async orderSelectedProducts() {
        await ui5.userInteraction.click(this.orderButtonSelector);
    };

    get confirmationPopUpSelector() {
        return nonUi5.element.getElementByCss("div[class*='sapMMessageToast']");
    };

    async waitForOrderConfirmation() {
        await nonUi5.element.waitToBeVisible(this.confirmationPopUpSelector, 5000);
    };

    async verifyStockChanges(initialStock, expectedChange = 10) {
        const expectedValue = (initialStock + expectedChange).toFixed(2);
        await ui5.assertion.expectAttributeToBe(this.initialProductStock, "number", expectedValue);
    }
}

module.exports = new ManageProductsPage();