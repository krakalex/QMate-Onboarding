const BasePage = require('./base.page');

class ManageProductsPage extends BasePage {

    product1ComboBoxSelector = {
        "elementProperties": {
            "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
            "metadata": "sap.m.CheckBox",
            "bindingContextPath": "/Products(1)"
      }
    };

    async waitForPageOpened() {
        await browser.waitUntil(
            async () => {
                return (await ui5.element.isVisible(this.product1ComboBoxSelector));
            },{
                timeout: 10000,
                timeoutMsg: 'Manage Products page did not open entirely within the expected time'
            }
        )
    };

    async selectProduct1() {
        await ui5.userInteraction.click(this.product1ComboBoxSelector);
    };

    product1Stock = {
        "elementProperties": {
            "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
            "metadata": "sap.m.ObjectNumber",
            "bindingContextPath": "/Products(1)",
            "id": "__number2-__clone3",
            "number": "*"
        }
    };

    async getProduct1Stock() {
        const value = await ui5.control.getProperty(this.product1Stock, "number");
        return Number(value);
    };

    orderButtonSelector = {
        "elementProperties": {
            "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
            "metadata": "sap.m.Button",
            "type": "Accept"
        }
    };

    async orderSelectedProducts() {
        await ui5.userInteraction.click(this.orderButtonSelector);
    };

    get confirmationPopUpSelector() {
        return nonUi5.element.getElementByCss("div[class*='sapMMessageToast']");
    };

    async waitForOrderConfirmation() {
        await nonUi5.element.waitToBeVisible(this.confirmationPopUpSelector, 5000);
        await nonUi5.element.waitForAll(this.confirmationPopUpSelector, 5000);
    };

    async verifyStockChanges(initialStock, expectedChange = 10) {
        const updatedStock  = await this.getProduct1Stock();
        if (initialStock !== updatedStock - expectedChange) {
            throw new Error(`Stock verification failed: expected ${updatedStock} but got ${initialStock} `);
        }
    }
}

module.exports = new ManageProductsPage();