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

    async addProductToCart() {
        const addButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>addToCartShort" }]
            }
        };
        await ui5.userInteraction.click(addButtonSelector);
        await attachScreenshot('Product Added to Cart');
    }

    async goBackToCategory() {
        await ui5.userInteraction.click(this.BACK_BUTTON_SELECTOR);
        await attachScreenshot('Back to Category Page');
    }

    async searchProductAndAddToCart(productName, quantity) {
        // 1. Enter search value
        await ui5.userInteraction.setValue(this.SEARCH_FIELD_SELECTOR, productName);
        await attachScreenshot(`Searched for "${productName}"`);

        // 2. Click the product that appears
        const searchedProductSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem",
                title: productName
            }
        };
        await ui5.userInteraction.click(searchedProductSelector);
        await attachScreenshot(`Selected product "${productName}"`);

        // 3. Set quantity
        const quantitySelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Input",
                id: "*quantityInput"
            }
        };
        await ui5.userInteraction.setValue(quantitySelector, quantity);

        // 4. Add to cart
        const addButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>addToCartShort" }]
            }
        };
        await ui5.userInteraction.click(addButtonSelector);
        await attachScreenshot(`Added ${quantity} of "${productName}" to cart`);

        // 5. Store price and quantity for later verification
        const productPrice = await ui5.element.getPropertyValue(
            { elementProperties: { viewName: "sap.ui.demo.cart.view.Product", metadata: "sap.m.Text", id: "*priceText" } },
            'text'
        );

        browser.sharedStore.set('secondProduct', {
            name: productName,
            price: parseFloat(productPrice.replace('$', '')),
            quantity
        });
    }
}

export default new HomePage();