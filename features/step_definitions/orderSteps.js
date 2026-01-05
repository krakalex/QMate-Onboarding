const { Given, When, Then } = require('@wdio/cucumber-framework');
const manageProductsPage = require('../../pageobjects/manageProducts.page');

let initialStock;

Given(/^I open the Demokit application$/, async () => {
    await manageProductsPage.openPage();
    await manageProductsPage.waitForPageOpened();
});

When(/^I check the initial stock of the first product$/, async () => {
    await manageProductsPage.selectInitialProduct();
    initialStock = await manageProductsPage.getInitialProductStock();
});

When(/^I place an order for the selected product$/, async () => {
    await manageProductsPage.orderSelectedProducts();
});

Then(/^I should see that the stock was updated correctly$/, async () => {
    await manageProductsPage.verifyStockChanges(initialStock);
});