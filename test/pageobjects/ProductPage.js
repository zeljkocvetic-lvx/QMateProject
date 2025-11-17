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
        this.PRODUCT_NAME_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Title"
            }
        };

        this.PRODUCT_PRICE_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.ObjectNumber"
            }
        };
    }

    async clickCartButton() {
        await ui5.userInteraction.click(this.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async goToCart() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
    }

    async getProductDetails() {
        const name = await ui5.element.getPropertyValue(this.PRODUCT_NAME_SELECTOR, "text");
        const priceRaw = await ui5.element.getPropertyValue(this.PRODUCT_PRICE_SELECTOR, "number");

        const price = parseFloat(priceRaw);

        return {
            name,
            price,
            quantity: 1
        };
    }
}

export default new ProductPage();