// file: pageobjects/HomePage.js
import { attachScreenshot } from '../helpers/screenshotHelper.js';

class HomePage {

    constructor() {
        this.PRODUCT_ITEM_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem"
            }
        };

        this.FILTER_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.Button",
                id: "*masterListFilterButton"
            }
        };

        this.OK_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.Button",
                id: "*categoryFilterDialog-acceptbutton"
            }
        };

        this.BACK_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.Button",
                id: "*page-navButton"
            }
        };

        this.SEARCH_FIELD_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.SearchField",
                id: "*searchField"
            }
        };

        this.CART_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.ToggleButton",
                tooltip: [
                    { model: "i18n", path: "toCartButtonTooltip", value: "Show Shopping Cart", type: "string" }
                ]
            }
        };
    }

    async openApp() {
        await browser.url(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await attachScreenshot('Home Page Opened');
    }

    async selectCategoryByName(categoryName) {
        const categorySelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                title: categoryName
            }
        };
        await ui5.userInteraction.click(categorySelector);
        await attachScreenshot(`Category "${categoryName}" Selected`);
    }

    async filterByAvailability() {
        await ui5.userInteraction.click(this.FILTER_BUTTON_SELECTOR);

        const filterItemSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: "Availability"
            }
        };
        await ui5.userInteraction.click(filterItemSelector);

        const filterOptionSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: "Available"
            }
        };
        await ui5.userInteraction.click(filterOptionSelector);

        await ui5.userInteraction.click(this.OK_BUTTON_SELECTOR);
        await attachScreenshot('Products filtered by availability');
    }

    async selectAndStoreFirstProduct() {
        const productName = await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'title', 0);
        const productPrice = await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'number', 0);
        global.filteredProduct = {
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        };
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
        await attachScreenshot('First Product in Category Selected');
    }

    async addProductToCart(times = 1) {
        const addButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>addToCartShort" }]
            }
        };

        for (let i = 0; i < times; i++) {
            await ui5.userInteraction.click(addButtonSelector);
        }

        await attachScreenshot(`Product added to cart ${times} time(s)`);
    }

    async goBackToCategory() {
        await ui5.userInteraction.click(this.BACK_BUTTON_SELECTOR);
        await attachScreenshot('Back to Category Page');
    }

    async searchProductAndAddToCart(productName, quantity = 1) {
        await ui5.userInteraction.fill(this.SEARCH_FIELD_SELECTOR, productName);
        await attachScreenshot(`Searched for "${productName}"`);

        const searchedProductSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.ObjectListItem"
            }
        };

        const firstProductName = await ui5.element.getPropertyValue(searchedProductSelector, 'title', 0);
        const firstProductPrice = await ui5.element.getPropertyValue(searchedProductSelector, 'number', 0);

        // Store globally to validate later in checkout
        global.secondProduct = {
            name: firstProductName,
            price: parseFloat(firstProductPrice),
            quantity
        };

        await ui5.userInteraction.click(searchedProductSelector, 0);
        await attachScreenshot(`Selected product "${firstProductName}"`);

        // Add to cart
        await this.addProductToCart(quantity);
    }

    async goToCart() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
        await attachScreenshot('Navigated to Cart');
    }
}

export default new HomePage();