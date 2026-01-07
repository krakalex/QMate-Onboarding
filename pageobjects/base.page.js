class BasePage {

    async openPage(path = "") {
        await common.navigation.navigateToUrl(path);
    }
} 

module.exports = BasePage;