import { attachScreenshot } from '../helpers/screenshotHelper.js';

class HomePage {

    async openApp() {
        await browser.url(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await attachScreenshot('Home Page Opened');
    }

    async addFirstPromotedItem() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.Button",
                bindingContextPath: "/Promoted/0"
            }
        });
        await attachScreenshot('First Promoted Item Added');
    }

    async selectCategory(categoryCode) {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                bindingContextPath: `/ProductCategories*'${categoryCode}')`
            }
        });
        await attachScreenshot(`Category ${categoryCode} Selected`);
    }

    async selectFirstProductInCategory() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem"
            },
            index: 0
        });
        await attachScreenshot('First Product in Category Selected');
    }

    async addProductToCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [
                    { path: "i18n>addToCartShort" }
                ]
            }
        });
        await attachScreenshot('Product Added to Cart');
    }

    async addProductMultipleTimes(count) {
        for (let i = 0; i < count; i++) {
            await this.addProductToCart();
        }
    }

    async openCartFromWelcome() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.ToggleButton"
            }
        });
        await attachScreenshot('Cart Opened from Welcome Page');
    }

    async openCartFromProductPage() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.ToggleButton"
            }
        });
        await attachScreenshot('Cart Opened from Product Page');
    }
}

export default new HomePage();