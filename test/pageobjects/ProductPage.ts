import type { ProductDetails } from '../support/interfaces.ts';

class ProductPage {
    PRODUCT_NAME_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Product",
            metadata: "sap.m.Title"
        }
    };

    PRODUCT_PRICE_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Product",
            metadata: "sap.m.ObjectNumber"
        }
    };

    ADD_TO_CART_BUTTON_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Product",
            metadata: "sap.m.Button",
            text: [{ path: "i18n>addToCartShort" }]
        }
    };

    CART_BUTTON_SELECTOR = {
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

    async getProductName(): Promise<string> {
        return await ui5.element.getPropertyValue(this.PRODUCT_NAME_SELECTOR, "text");
    }

    async getProductPrice(): Promise<number> {
        const priceRaw = await ui5.element.getPropertyValue(this.PRODUCT_PRICE_SELECTOR, "number");
        return parseFloat(priceRaw);
    }

    async getProductDetails(): Promise<ProductDetails> {
        const name = await this.getProductName();
        const price = await this.getProductPrice();
        return { name, price };
    }

    async clickAddToCartButton(): Promise<void> {
        await ui5.userInteraction.click(this.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async clickCartButton(): Promise<void> {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
    }

    async waitForPageLoaded(): Promise<void> {
        await ui5.element.getDisplayed(this.PRODUCT_NAME_SELECTOR);
    }
}

export default new ProductPage();