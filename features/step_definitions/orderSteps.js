const { Given, When, Then } = require('@wdio/cucumber-framework');
const manageProductsPage = require('../../pageobjects/manageProducts.page');

Given(/^I open the Demokit application$/, async () => {
    await manageProductsPage.openPage();
    await manageProductsPage.waitForPageOpened();
});

When('I check the {string} of the first product', async function (parameter) {
    await manageProductsPage.selectInitialProduct();
    this.initialStock = await manageProductsPage.getInitialProductStock();
});

When(/^I place an order for the selected product$/, async () => {
    await manageProductsPage.orderSelectedProducts();
});

Then(/^I should see that the stock was updated correctly$/, async function () {
    await manageProductsPage.verifyStockChanges(this.initialStock);
});