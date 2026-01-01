const manageProductsPage = require('../pageobjects/manageProducts.page');

describe('Place a new order', () => {
    let initialStock;

    it('Step 01: Open the Demokit app', async () => {
        await manageProductsPage.openApplication();
        await manageProductsPage.waitForPageOpened();
    });

    it('Step 02: Place an Order', async () => {
        await manageProductsPage.selectProduct1();
        initialStock = await manageProductsPage.getProduct1Stock();
        await manageProductsPage.orderSelectedProducts();
        // await manageProductsPage.waitForOrderConfirmation();
    });

    it('Step 03: Verify the stock was updated', async () => {
        await manageProductsPage.verifyStockChanges(initialStock);
    });
});