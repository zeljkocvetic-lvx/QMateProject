// file: pageobjects/CheckoutPage.js
import { attachScreenshot } from '../helpers/screenshotHelper.js';

class CheckoutPage {

    constructor() {
        this.CART_ITEM_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.ObjectListItem"
            }
        };

        this.CHECKOUT_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>checkout" }]
            }
        };
    }

    async waitForPageLoaded() {
        await ui5.userInteraction.waitForDisplayed(this.CART_ITEM_SELECTOR, 5000);
        await attachScreenshot('Checkout Page Loaded');
    }

    async getCartItems() {
        const elements = await ui5.element.getDisplayed(this.CART_ITEM_SELECTOR);
        const items = [];

        for (let i = 0; i < elements.length; i++) {
            const name = await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'title', i);
            const quantity = parseInt(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'number', i));
            const priceText = await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'number', i); // adjust if price is in different property
            const price = parseFloat(priceText);

            items.push({ name, quantity, price });
        }

        return items;
    }

    async proceedToCheckout() {
        await ui5.userInteraction.click(this.CHECKOUT_BUTTON_SELECTOR);
        await attachScreenshot('Proceeded to Checkout');
    }
}

export default new CheckoutPage();