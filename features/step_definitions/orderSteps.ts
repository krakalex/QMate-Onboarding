import { Given, When, Then, setWorldConstructor } from "@wdio/cucumber-framework";
import manageProductsPage from "../../pageobjects/manageProducts.page.js";

class CustomWorld {
    initialProductStockQuantity: number;

    constructor() {
        this.initialProductStockQuantity = 0;
    }

    setInitialProductStockQuantity(quantity: number) {
        this.initialProductStockQuantity = quantity;
    }

    getInitialProductStockQuantity() {
        return this.initialProductStockQuantity;
    }
}

setWorldConstructor(CustomWorld);

Given("Open the Demokit application", async () => {
    await manageProductsPage.openPage();
    await manageProductsPage.waitForPageOpened();
    await browser.takeScreenshot();
});

When("Get {string} quantity in stock", async function (this: CustomWorld, productName: string) {
    await manageProductsPage.selectProductByName(productName);
    this.setInitialProductStockQuantity(await manageProductsPage.getProductStock(productName));
});

When("Place an order for the selected product", async () => {
    await manageProductsPage.orderSelectedProducts();
    await manageProductsPage.waitForOrderConfirmation();
    await browser.takeScreenshot();
});

Then(
    "Verify that {string} stock quantity increased by {int}",
    async function (this: CustomWorld, productName: string, expectedIncrease: number) {
        const updatedProductStockQuantity = await manageProductsPage.getProductStock(productName);
        await common.assertion.expectEqual(
            updatedProductStockQuantity,
            this.getInitialProductStockQuantity() + expectedIncrease,
        );
        await browser.takeScreenshot();
    },
);
