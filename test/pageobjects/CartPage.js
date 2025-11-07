// pageobjects/CartPage.js
import { attachScreenshot } from '../helpers/screenshotHelper.js';

class CartPage {
    constructor() { }

    async proceedToCheckout() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Button",
                text: "Proceed"
            }
        });
        await attachScreenshot('Proceeded to Checkout');
    }

    async laptopInCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Text",
                bindingContextPath: "/cartEntries/HT-1251"
            }
        });
        await attachScreenshot('Laptop in Cart Selected');
    }

    async miceInCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Text",
                bindingContextPath: "/cartEntries/HT-1068"
            }
        });
        await attachScreenshot('Mice in Cart Selected');
    }

    async verifyMiceQuantity(expectedQuantity) {
        const quantity = await ui5.control.getProperty({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.StepInput",
                bindingContextPath: "/cartEntries/HT-1068"
            },
            propertyName: "value"
        });

        expect(quantity).toEqual(expectedQuantity);
        await attachScreenshot(`Mice Quantity Verified: ${expectedQuantity}`);
    }
}

export default new CartPage();