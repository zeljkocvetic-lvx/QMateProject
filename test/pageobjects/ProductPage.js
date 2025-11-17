class ProductPage {
    constructor() {
        // Product detail page selectors
        this.ADD_TO_CART_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>addToCartShort" }]
            }
        };

        this.CART_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.ToggleButton",
                tooltip: [
                    {
                        model: "i18n",
                        path: "toCartButtonTooltip",
                        value: "Show Shopping Cart",
                        type: "string"
                    }
                ]
            }
        };
    }

    async addProductToCart() {
        await ui5.userInteraction.click(this.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async clickCartButton() {
        await this.addProductToCart();
    }

    async goToCart() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
    }

    async getProductDetails() {
        const name = await ui5.element.getPropertyValue({ viewName: "sap.ui.demo.cart.view.Product", metadata: "sap.m.Title" }, 'text');
        const price = parseFloat(await ui5.element.getPropertyValue({ viewName: "sap.ui.demo.cart.view.Product", metadata: "sap.m.ObjectNumber" }, 'number'));
        return { name, price, quantity: 1 };
    }
}

export default new ProductPage();