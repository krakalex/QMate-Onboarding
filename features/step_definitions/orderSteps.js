const { Given, When, Then, setWorldConstructor } = require('@wdio/cucumber-framework');
const manageProductsPage = require('../../pageobjects/manageProducts.page');

class CustomWorld {
    constructor() {
        this.productName = '';
        this.initialProductStockQuantity = 0;
    }

    setProductName(name) {
        this.productName = name;
    }

    getProductName() {
        return this.productName;
    }

    setInitialProductStockQuantity(quantity) {
        this.initialProductStockQuantity = quantity;
    }

    getInitialProductStockQuantity() {
        return this.initialProductStockQuantity;
    }
}

setWorldConstructor(CustomWorld);

Given('Open the Demokit application', async () => {
    await manageProductsPage.openPage();
    await manageProductsPage.waitForPageOpened();
    await browser.takeScreenshot();
});

When('Store the stock of the product {string}', async function (productName) {
    this.setProductName(productName);
    await manageProductsPage.selectProductByName(productName);
    this.setInitialProductStockQuantity(await manageProductsPage.getProductStock(productName));
});

When('Place an order for the selected product', async () => {
    await manageProductsPage.orderSelectedProducts();
    await manageProductsPage.waitForOrderConfirmation();
    await browser.takeScreenshot();
});

Then('Verify that the stock quantity increased by {int}', async function (expectedIncrease) {
    const updatedProductStockQuantity = await manageProductsPage.getProductStock(this.getProductName());
    await common.assertion.expectEqual(updatedProductStockQuantity, this.getInitialProductStockQuantity() + expectedIncrease);
    await browser.takeScreenshot();
});