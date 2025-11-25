import type { product } from '../support/productInterface.ts';
import { BasePage } from './BasePage.ts';
import { QmateSelector } from 'wdio-qmate-service/modules/ui5/types/ui5.types';

class CartPage extends BasePage {
    private static readonly CART_ITEM_SELECTOR: QmateSelector = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Cart",
            metadata: "sap.m.ObjectListItem"
        }
    };

    private static readonly CART_BUTTON_SELECTOR: QmateSelector = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Home",
            metadata: "sap.m.ToggleButton"
        }
    };

    private static readonly CART_PAGE_TITLE_SELECTOR: QmateSelector = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Cart",
            metadata: "sap.m.Title",
            id: "*page-title"
        }
    };

    async openCart(): Promise<void> {
        await ui5.userInteraction.click(CartPage.CART_BUTTON_SELECTOR);
    }

    async getProducts(): Promise<product[]> {
        const elements = await ui5.element.getAllDisplayed(CartPage.CART_ITEM_SELECTOR);
        const items: product[] = [];

        for (let i = 0; i < elements.length; i++) {
            const product: product = {
                name: await ui5.element.getPropertyValue(CartPage.CART_ITEM_SELECTOR, 'title', i),
                quantity: parseInt(await ui5.element.getPropertyValue(CartPage.CART_ITEM_SELECTOR, 'intro', i)),
                price: parseFloat(await ui5.element.getPropertyValue(CartPage.CART_ITEM_SELECTOR, 'number', i))
            };
            items.push(product);
        }

        return items;
    }

    async waitForPageLoaded(): Promise<void> {
        await ui5.element.getDisplayed(CartPage.CART_PAGE_TITLE_SELECTOR);
    }
}

export default new CartPage();