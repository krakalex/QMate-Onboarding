import BasePage from "./base.page.js";

class ManageProductsPage extends BasePage {
    private orderButtonSelector = {
        elementProperties: {
            viewName: "mycompany.myapp.MyWorklistApp.view.Worklist",
            metadata: "sap.m.Button",
            type: "Accept",
        },
    };

    private confirmationPopUpSelector = "div[class*='sapMMessageToast']";

    async openPage(): Promise<void> {
        await common.navigation.navigateToUrl(
            "https://sdk.openui5.org/test-resources/sap/m/demokit/tutorial/worklist/07/webapp/test/mockServer.html?sap-ui-theme=sap_horizon",
        );
    }

    async waitForPageOpened(): Promise<void> {
        await util.browser.waitUntil(
            async () => await ui5.element.isVisible(this.orderButtonSelector),
            {
                timeout: 10000,
                timeoutMsg: "Manage Products page did not open entirely within the expected time",
            },
        );
    }
    /**
     * Selects product by its name.
     * @param productName The name of the product to select.
     * @example
     * await manageProductsPage.selectProductByName("Laptop Basic 15");
     */
    async selectProductByName(productName: string): Promise<void> {
        const productCheckBoxSelector = {
            elementProperties: {
                metadata: "sap.m.CheckBox",
                bindingContextPath: "/Products*)",
            },
            ancestorProperties: {
                metadata: "sap.m.ColumnListItem",
                descendantProperties: {
                    metadata: "sap.m.ObjectIdentifier",
                    title: productName,
                },
            },
        };
        await ui5.userInteraction.click(productCheckBoxSelector);
    }

    async getProductStock(productName: string): Promise<number> {
        const productStockSelector = {
            elementProperties: {
                metadata: "sap.m.ObjectNumber",
                id: "__number2*",
            },
            ancestorProperties: {
                metadata: "sap.m.ColumnListItem",
                descendantProperties: {
                    text: productName,
                },
            },
        };
        const value = await ui5.control.getProperty(productStockSelector, "number");
        return Number(value);
    }

    async orderSelectedProducts(): Promise<void> {
        await ui5.userInteraction.click(this.orderButtonSelector);
    }

    async waitForOrderConfirmation(): Promise<void> {
        await nonUi5.element.waitToBeVisible(this.confirmationPopUpSelector, 5000);
    }
}

export default new ManageProductsPage();
