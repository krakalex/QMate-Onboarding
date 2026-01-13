const { Given, When, Then, setWorldConstructor } = require('@wdio/cucumber-framework');
const manageProductsPage = require('../../pageobjects/manageProducts.page');

class CustomWorld {
    constructor() {
        this.productName = '';
        this.initialProductStockQuantity = 0;
    }
}

setWorldConstructor(CustomWorld);

Given('Open the Demokit application', async () => {
    await manageProductsPage.openPage();
    await manageProductsPage.waitForPageOpened();
    await browser.takeScreenshot();
});

When('Check the stock of the product {string}', async function (productName) {
    this.productName = productName;
    await manageProductsPage.selectProductByName(productName);
    this.initialProductStockQuantity = await manageProductsPage.getProductStock(productName);
});

When('Place an order for the selected product', async () => {
    await manageProductsPage.orderSelectedProducts();
    await manageProductsPage.waitForOrderConfirmation();
    await browser.takeScreenshot();
});

Then('Verify that the stock quantity increased by {int}', async function (expectedIncrease) {
    const updatedProductStockQuantity = await manageProductsPage.getProductStock(this.productName);
    await manageProductsPage.verifyStockChanges(this.initialProductStockQuantity, updatedProductStockQuantity, expectedIncrease);
    await browser.takeScreenshot();
});