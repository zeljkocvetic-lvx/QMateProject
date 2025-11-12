class CheckoutPage {
    constructor() {
        this.CART_ENTRY_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.ObjectListItem",
                bindingContextPath: "/cartEntries/*"
            }
        };
    }

    async getCartItems() {
        await ui5.assertion.expectToBeVisible(this.CART_ENTRY_SELECTOR);

        const elements = await ui5.element.getAllDisplayed(this.CART_ENTRY_SELECTOR);
        const items = [];

        for (let i = 0; i < elements.length; i++) {
            const name = await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'title', i);
            const quantity = parseInt(await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'intro', i));
            const price = parseFloat(await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'number', i));
            items.push({ name, quantity, price });
        }

        return items;
    }
}

export default new CheckoutPage();