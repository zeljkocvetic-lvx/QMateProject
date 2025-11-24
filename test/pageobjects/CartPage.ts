import { CartItem } from '../support/types.ts';
import { BasePage } from './BasePage.ts';

class CartPage extends BasePage {
    CART_ITEM_SELECTOR: any;
    CART_BUTTON_SELECTOR: any;
    CART_PAGE_TITLE_SELECTOR: any;

    constructor() {
        super();

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

        this.CART_PAGE_TITLE_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Title",
                id: "*page-title"
            }
        };
    }

    async openCart(): Promise<void> {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
    }

    async getCartItems(): Promise<CartItem[]> {
        const elements = await ui5.element.getAllDisplayed(this.CART_ITEM_SELECTOR);
        const items: CartItem[] = [];

        for (let i = 0; i < elements.length; i++) {
            const product: CartItem = {
                name: await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'title', i),
                quantity: parseInt(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'intro', i)),
                price: parseFloat(await ui5.element.getPropertyValue(this.CART_ITEM_SELECTOR, 'number', i))
            };
            items.push(product);
        }

        return items;
    }

    async waitForPageLoaded(): Promise<void> {
        await ui5.element.getDisplayed(this.CART_PAGE_TITLE_SELECTOR);
    }
}

export default new CartPage();