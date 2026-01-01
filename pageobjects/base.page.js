class BasePage {

    async openApplication() {
        await ui5.navigation.navigateToApplication("");
    }
} 

module.exports = BasePage;