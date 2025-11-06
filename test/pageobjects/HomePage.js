// pageobjects/HomePage.js

class HomePage {

    //  Open Application 
    async openApp() {
        await browser.url('https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon');

    }

    //  Individual Actions 
    async addFirstItem() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.Button",
                bindingContextPath: "/Promoted/0"
            }
        });
    }

    async selectCategoryLaptops() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                bindingContextPath: "/ProductCategories*'LT')"
            }
        });
    }

    async selectCategoryMice() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                bindingContextPath: "/ProductCategories*'MI')"
            }
        });
    }

    async selectLaptop() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem",
                bindingContextPath: "/Products*'HT-1251')"
            }
        });
    }

    async selectMice() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem",
                bindingContextPath: "/Products*'HT-1068')"
            }
        });
    }

    async addProducToCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [
                    {
                        path: "i18n>addToCartShort"
                    }
                ]
            }
        });
    }

    async addProductMultipleTimes(count) {
        for (let i = 0; i < count; i++) {
            await this.addProducToCart();
        }
    }

    async openCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.ToggleButton"
            }
        });
    }

    async openCartfromProduct() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.ToggleButton"
            }
        });
    }

    // Combined flow: adds 1 laptop + 2 mice, then opens cart
    async completeLaptopPurchaseFlow() {
        await this.selectCategoryLaptops();
        await this.selectLaptop();
        await this.addProducToCart();

        await this.openApp();
        await this.selectCategoryMice();
        await this.selectMice();

        // Click Add to Cart twice for the same mice
        await this.addProductMultipleTimes(2);

        await this.openCartfromProduct();
    }
}

// Export instance
export default new HomePage();