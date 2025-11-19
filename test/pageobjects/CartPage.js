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
    }

    async getCartItems() {
        const elements = await ui5.element.getAllDisplayed(this.CART_ITEM_SELECTOR);
        const items = [];

        for (let i = 0; i < elements.length; i++) {
            const product = {
                name: await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'title', i),
                quantity: parseInt(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'intro', i)),
                price: parseFloat(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'number', i))
            };
            items.push(product);
        }

        return items;
    }
}

export default new CartPage();