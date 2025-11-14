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
        const elements = await ui5.element.getAllDisplayed(this.CART_ENTRY_SELECTOR);

        if (!elements || elements.length === 0) {
            return [];
        }

        const items = [];

        for (let index = 0; index < elements.length; index++) {
            const name = await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'title', index);
            const quantity = parseInt(
                await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'intro', index),
                10
            );
            const price = parseFloat(
                await ui5.element.getPropertyValue(this.CART_ENTRY_SELECTOR, 'number', index)
            );

            items.push({ name, quantity, price });
        }

        return items;
    }
}

export default new CheckoutPage();