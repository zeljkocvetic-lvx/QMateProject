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
        if (elements.length === 0) throw new Error('No products displayed in cart');

        const items = [];
        for (let i = 0; i < elements.length; i++) {
            const name = await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'title', i);
            const quantity = parseInt(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'intro', i));
            const price = parseFloat(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'number', i));
            items.push({ name, quantity, price });
        }

        return items;
    }

    async validateCartProducts(expectedProducts) {
        const cartItems = await this.getCartItems();

        if (cartItems.length !== expectedProducts.length) {
            throw new Error(`Expected ${expectedProducts.length} products in cart, found ${cartItems.length}`);
        }

        expectedProducts.forEach(product => {
            const item = cartItems.find(i => i.name === product.name);
            if (!item) throw new Error(`Product "${product.name}" not found in cart`);
            if (item.quantity !== product.quantity)
                throw new Error(`Quantity mismatch for "${product.name}": expected ${product.quantity}, got ${item.quantity}`);
            if (item.price !== product.price)
                throw new Error(`Price mismatch for "${product.name}": expected ${product.price}, got ${item.price}`);
        });

        await attachScreenshot('Cart Validation Completed');
    }
}

export default new CartPage();