import { attachScreenshot } from '../helpers/screenshotHelper.js';

class HomePage {
    constructor() {
        //  Selectors 
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

    //  Navigation and actions 

    async openApp() {
        await browser.url(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await ui5.assertion.expectToBeVisible(this.SEARCH_FIELD_SELECTOR);
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
        await ui5.assertion.expectToBeVisible(categorySelector);
        await ui5.userInteraction.click(categorySelector);
        await attachScreenshot(`Category "${categoryName}" Selected`);
    }

    async openFilterDialog() {
        await ui5.userInteraction.click(this.FILTER_BUTTON_SELECTOR);
    }

    async selectFilterCriterion(criterion) {
        const criterionSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: criterion
            }
        };
        await ui5.userInteraction.click(criterionSelector);
    }

    async selectFilterOption(option) {
        const optionSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: option
            }
        };
        await ui5.userInteraction.click(optionSelector);
    }

    async confirmFilterSelection() {
        await ui5.userInteraction.click(this.OK_BUTTON_SELECTOR);
        await attachScreenshot('Products Filtered');
    }

    async filterByAvailability() {
        await this.openFilterDialog();
        await this.selectFilterCriterion('Availability');
        await this.selectFilterOption('Available');
        await this.confirmFilterSelection();
    }

    //  Product handling 

    async getFirstProductDetails() {
        const product = {
            name: await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'title', 0),
            price: parseFloat(await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'number', 0)),
            quantity: 1
        };
        await attachScreenshot('First Product Details Captured');
        return product;
    }

    async selectFirstProduct() {
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
        await attachScreenshot('First Product Selected');
    }

    async selectAndStoreFirstProduct() {
        const product = {
            name: await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'title', 0),
            price: parseFloat(await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'number', 0)),
            quantity: 1
        };
        global.filteredProduct = { ...product };
        await attachScreenshot(`Stored Product: ${product.name}`);
    }

    async addProductToCart(times = 1) {
        const addButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>addToCartShort" }]
            }
        };
        for (let i = 0; i < times; i++) {
            await ui5.userInteraction.click(addButton);
        }
        await attachScreenshot(`${times}x Product Added to Cart`);
    }

    async goBackToCategory() {
        await ui5.userInteraction.click(this.BACK_BUTTON_SELECTOR);
        await attachScreenshot('Returned to Category Page');
    }

    async searchProduct(name) {
        await ui5.userInteraction.fill(this.SEARCH_FIELD_SELECTOR, name);
        await browser.keys('Enter');
        await browser.pause(1500);
        await attachScreenshot(`Searched for Product: "${name}"`);
    }

    async selectSearchedProduct() {
        const productSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.ObjectListItem"
            }
        };
        await ui5.assertion.expectToBeVisible(productSelector);

        const product = {
            name: await ui5.element.getPropertyValue(productSelector, 'title', 0),
            price: parseFloat(await ui5.element.getPropertyValue(productSelector, 'number', 0))
        };

        await ui5.userInteraction.click(productSelector, 0);
        await attachScreenshot(`Selected Searched Product: "${product.name}"`);

        return product;
    }

    async goToCart() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
        await attachScreenshot('Navigated to Cart');
    }
}

export default new HomePage();