// file: pageobjects/CheckoutPage.js
import { attachScreenshot } from '../helpers/screenshotHelper.js';

class CheckoutPage {

    constructor() {
        // Generic selector for any cart entry
        this.CART_ENTRY_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.ObjectListItem",
                bindingContextPath: "/cartEntries/*"
            }
        };

        // Checkout button
        this.CHECKOUT_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>checkout" }]
            }
        };

        // Page title to ensure cart loaded
        this.PAGE_TITLE_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Title",
                id: "*page-title"
            }
        };
    }

    // Wait until cart page is fully loaded
    async waitForPageLoaded(timeout = 5000) {
        await ui5.element.waitForAll(this.PAGE_TITLE_SELECTOR, timeout);
        await attachScreenshot('Cart Page Loaded');
    }

    // Get all displayed cart items (name, quantity, price)
    async getCartItems() {
        const elements = await ui5.element.getAllDisplayed(this.CART_ENTRY_SELECTOR);
        if (elements.length === 0) {
            throw new Error('No products displayed in cart');
        }

        const items = [];
        for (let i = 0; i < elements.length; i++) {
            const name = await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'title', i);
            const quantity = parseInt(await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'intro', i));
            const priceText = await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'number', i);
            const price = parseFloat(priceText);

            items.push({ name, quantity, price });
        }

        return items;
    }

    // Get quantity for a specific product
    async getQuantityForProduct(productName) {
        const selector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.ObjectListItem",
                title: productName,
                bindingContextPath: "/cartEntries/*"
            }
        };
        const quantityText = await ui5.control.getProperty(selector, "intro");
        return parseInt(quantityText);
    }

    // Get total number of items in cart
    async getTotalCartItems() {
        const items = await ui5.element.getAllDisplayed(this.CART_ENTRY_SELECTOR);
        return items.length;
    }


}

export default new CheckoutPage();