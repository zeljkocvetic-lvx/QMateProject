import type { product } from '../support/productInterface.ts';
import { QmateSelector } from 'wdio-qmate-service/modules/ui5/types/ui5.types';

class ProductPage {
    private static readonly PRODUCT_NAME_SELECTOR: QmateSelector = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Product",
            metadata: "sap.m.Title"
        }
    };

    private static readonly PRODUCT_PRICE_SELECTOR: QmateSelector = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Product",
            metadata: "sap.m.ObjectNumber"
        }
    };

    private static readonly ADD_TO_CART_BUTTON_SELECTOR: QmateSelector = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Product",
            metadata: "sap.m.Button",
            text: [{ path: "i18n>addToCartShort" }]
        }
    };

    private static readonly CART_BUTTON_SELECTOR: QmateSelector = {
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
        return await ui5.element.getPropertyValue(ProductPage.PRODUCT_NAME_SELECTOR, "text");
    }

    async getProductPrice(): Promise<number> {
        const priceRaw = await ui5.element.getPropertyValue(ProductPage.PRODUCT_PRICE_SELECTOR, "number");
        return parseFloat(priceRaw);
    }

    async getProductDetails(): Promise<Omit<product, 'quantity'>> {
        const name = await this.getProductName();
        const price = await this.getProductPrice();
        return { name, price };
    }

    async clickAddToCartButton(): Promise<void> {
        await ui5.userInteraction.click(ProductPage.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async clickCartButton(): Promise<void> {
        await ui5.userInteraction.click(ProductPage.CART_BUTTON_SELECTOR);
    }

    async waitForPageLoaded(): Promise<void> {
        await ui5.element.getDisplayed(ProductPage.PRODUCT_NAME_SELECTOR);
    }
}

export default new ProductPage();