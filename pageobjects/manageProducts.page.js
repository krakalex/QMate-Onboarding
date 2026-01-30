const BasePage = require('./base.page');

class ManageProductsPage extends BasePage {

    orderButtonSelector = {
        "elementProperties": {
            "viewName": "mycompany.myapp.MyWorklistApp.view.Worklist",
            "metadata": "sap.m.Button",
            "type": "Accept"
        }
    };

    confirmationPopUpSelector = "div[class*='sapMMessageToast']";

    async openPage() {
        await super.openPage("https://sdk.openui5.org/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon");
    }

    async waitForPageOpened() {
        await util.browser.waitUntil(
            async () => await ui5.element.isVisible(this.orderButtonSelector), { 
                timeout: 10000, 
                timeoutMsg: "Manage Products page did not open entirely within the expected time" 
            }
        );
    };

    async selectProductByName(productName) {
        const productCheckBoxSelector = {
            "elementProperties": {
                "metadata": "sap.m.CheckBox",
                "bindingContextPath": "/Products*)"
            },
            "ancestorProperties": {
                "metadata": "sap.m.ColumnListItem",
                "descendantProperties": {
                    "metadata": "sap.m.ObjectIdentifier",
                    "title": productName
                }
            }
        };
        await ui5.userInteraction.click(productCheckBoxSelector);
    };

    async getProductStock(productName) {
        const productStockSelector = {
            "elementProperties": {
                "metadata": "sap.m.ObjectNumber",
                "id": "__number2*"
            },
            "ancestorProperties": {
                "metadata": "sap.m.ColumnListItem",
                "descendantProperties": {
                    "text": productName
                }
            }
        };
        const value = await ui5.control.getProperty(productStockSelector, "number");
        return Number(value);
    };

    async orderSelectedProducts() {
        await ui5.userInteraction.click(this.orderButtonSelector);
    };

    async waitForOrderConfirmation() {
        await nonUi5.element.waitToBeVisible(this.confirmationPopUpSelector, 5000);
    };
}

module.exports = new ManageProductsPage();
            