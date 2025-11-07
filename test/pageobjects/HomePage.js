import { attachScreenshot } from '../helpers/screenshotHelper.js';

class HomePage {

    async openApp() {
        await browser.url('https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon');
        await attachScreenshot('Home Page Opened');
    }

    async addFirstItem() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.Button",
                bindingContextPath: "/Promoted/0"
            }
        });
        await attachScreenshot('First Item Added');
    }

    async selectCategoryLaptops() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                bindingContextPath: "/ProductCategories*'LT')"
            }
        });
        await attachScreenshot('Laptops Category Selected');
    }

    async selectCategoryMice() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                bindingContextPath: "/ProductCategories*'MI')"
            }
        });
        await attachScreenshot('Mice Category Selected');
    }

    async selectLaptop() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem",
                bindingContextPath: "/Products*'HT-1251')"
            }
        });
        await attachScreenshot('Laptop Selected');
    }

    async selectMice() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem",
                bindingContextPath: "/Products*'HT-1068')"
            }
        });
        await attachScreenshot('Mice Selected');
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
        await attachScreenshot('Product Added to Cart');
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
        await attachScreenshot('Cart Opened from Welcome Page');
    }

    async openCartfromProduct() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.ToggleButton"
            }
        });
        await attachScreenshot('Cart Opened from Product Page');
    }

    // Combined flow: adds 1 laptop + 2 mice, then opens cart
    async completeLaptopPurchaseFlow() {
        await this.selectCategoryLaptops();
        await this.selectLaptop();
        await this.addProducToCart();
        await attachScreenshot('Laptop Purchase Completed');

        await this.selectCategoryMice();
        await this.selectMice();
        await this.addProductMultipleTimes(2);
        await attachScreenshot('Mice Purchase Completed');

        await this.openCartfromProduct();
        await attachScreenshot('Cart Opened after Purchase');
    }
}

export default new HomePage();