import { attachScreenshot } from '../helpers/screenshotHelper.js';

class CartPage {
    constructor() {
        this.CART_ITEM_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.ObjectListItem"
            }
        };

        this.CART_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.ToggleButton"
            }
        };
    }

    async openCart() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
        await ui5.assertion.expectToBeVisible(this.CART_ITEM_SELECTOR);
        await attachScreenshot('Cart Opened');
    }

    async getCartItems() {
        const elements = await ui5.element.getAllDisplayed(this.CART_ITEM_SELECTOR);

        const items = [];
        for (let i = 0; i < elements.length; i++) {
            const name = await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'title', i);
            const quantity = parseInt(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'intro', i));
            const price = parseFloat(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'number', i));
            items.push({ name, quantity, price });
        }

        return items;
    }
}

export default new CartPage();