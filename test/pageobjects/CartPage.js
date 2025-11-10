import { attachScreenshot } from '../helpers/screenshotHelper.js';

class CartPage {

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

    async openCart() {
        const cartButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.ToggleButton"
            }
        };
        await ui5.userInteraction.click(cartButton);
        await attachScreenshot('Cart Opened');
    }

    async validateCartProducts() {
        const first = await browser.sharedStore.get('firstProduct');
        const second = await browser.sharedStore.get('secondProduct');

        const cartItems = await ui5.userInteraction.getAllProperties(this.CART_ITEM_SELECTOR, ['title', 'number']);
        if (cartItems.length !== 2) {
            throw new Error(`Expected 2 products in cart, found ${cartItems.length}`);
        }

        const checkItem = (product) => {
            const match = cartItems.find(item => item.title === product.name);
            if (!match) throw new Error(`Product "${product.name}" not found in cart`);
            if (match.number != product.quantity) throw new Error(`Product "${product.name}" quantity mismatch: expected ${product.quantity}, got ${match.number}`);
        };

        checkItem(first);
        checkItem(second);

        await attachScreenshot('Cart Validation Completed');
    }

    async proceedToCheckout() {
        await ui5.userInteraction.click(this.CHECKOUT_BUTTON_SELECTOR);
        await attachScreenshot('Checkout Clicked');
    }
}

export default new CartPage();