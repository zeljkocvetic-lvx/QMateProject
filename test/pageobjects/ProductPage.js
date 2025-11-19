class ProductPage {
    constructor() {
        // Product detail selectors
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

    async getProductName() {
        return await ui5.element.getPropertyValue(this.PRODUCT_NAME_SELECTOR, "text");
    }

    async getProductPrice() {
        const priceRaw = await ui5.element.getPropertyValue(this.PRODUCT_PRICE_SELECTOR, "number");
        return parseFloat(priceRaw);
    }

    async getProductDetails() {
        const name = await this.getProductName();
        const price = await this.getProductPrice();
        return { name, price, quantity: 1 };
    }

    async clickAddToCartButton() {
        await ui5.userInteraction.click(this.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async clickCartButton() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
    }
}

export default new ProductPage();