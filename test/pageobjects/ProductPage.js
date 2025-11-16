class ProductPage {
    constructor() {
        // Product selectors
        this.PRODUCT_ITEM_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem"
            }
        };

        this.SEARCH_RESULT_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.ObjectListItem"
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

    // Product selection
    async selectFirstProduct() {
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
    }

    async getFirstProductDetails() {
        const name = await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'title', 0);
        const price = parseFloat(await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'number', 0));
        return { name, price, quantity: 1 };
    }

    async selectSearchedProduct() {
        const name = await ui5.element.getPropertyValue(this.SEARCH_RESULT_SELECTOR, 'title', 0);
        const price = parseFloat(await ui5.element.getPropertyValue(this.SEARCH_RESULT_SELECTOR, 'number', 0));
        await ui5.userInteraction.click(this.SEARCH_RESULT_SELECTOR, 0);
        return { name, price, quantity: 1 };
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
}

export default new ProductPage();