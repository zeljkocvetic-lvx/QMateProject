class HomePage {
    constructor() {
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

        this.AVAILABILITY_CRITERION_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: "Availability"
            }
        };

        this.AVAILABILITY_OPTION_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: "Available"
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

    // Navigation
    async openApp() {
        await common.navigation.navigateToUrl(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await ui5.assertion.expectToBeVisible(this.SEARCH_FIELD_SELECTOR);
    }

    async selectCategoryByName(categoryName) {
        const selector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                title: categoryName
            }
        };
        await ui5.userInteraction.click(selector);
    }

    async goBackToCategory() {
        await ui5.userInteraction.click(this.BACK_BUTTON_SELECTOR);
    }

    async goToCart() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
    }

    // Product handling
    async addProductToCart() {
        await ui5.userInteraction.click(this.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async selectFirstProduct() {
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
    }

    async getFirstProductDetails() {
        const details = await this.getProductDetailsFromSelector(this.PRODUCT_ITEM_SELECTOR, 0);
        return { ...details, quantity: 1 };
    }

    async selectSearchedProduct() {
        const product = await this.getProductDetailsFromSelector(this.SEARCH_RESULT_SELECTOR, 0);
        await ui5.userInteraction.click(this.SEARCH_RESULT_SELECTOR, 0);
        return product;
    }

    async clickCartButton() {
        await this.addProductToCart();
    }

    async getProductDetailsFromSelector(selector, index = 0) {
        return {
            name: await ui5.element.getPropertyValue(selector, 'title', index),
            price: parseFloat(await ui5.element.getPropertyValue(selector, 'number', index))
        };
    }

    // Filtering
    async filterByAvailability() {
        await ui5.userInteraction.click(this.FILTER_BUTTON_SELECTOR);
        await ui5.userInteraction.click(this.AVAILABILITY_CRITERION_SELECTOR);
        await ui5.userInteraction.click(this.AVAILABILITY_OPTION_SELECTOR);
        await ui5.userInteraction.click(this.OK_BUTTON_SELECTOR);
    }

    // Search
    async searchProduct(name) {
        await ui5.userInteraction.searchFor(this.SEARCH_FIELD_SELECTOR, name);
    }

}

export default new HomePage();