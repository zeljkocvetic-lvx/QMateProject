class HomePage {
    constructor() {
        this.PRODUCT_ITEM_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem"
            }
        };

        this.CATEGORY_ITEM_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem"
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

        this.SEARCH_RESULT_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.ObjectListItem"
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

        this.ADD_TO_CART_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>addToCartShort" }]
            }
        };
    }

    getCategorySelectorByName(category) {
        return {
            ...this.CATEGORY_ITEM_SELECTOR,
            elementProperties: {
                ...this.CATEGORY_ITEM_SELECTOR.elementProperties,
                title: category
            }
        };
    }

    async click(selector, index = 0) {
        await ui5.assertion.expectToBeVisible(selector);
        await ui5.userInteraction.click(selector, index);
    }

    async getListItemDetails(selector, index = 0) {
        return {
            name: await ui5.element.getPropertyValue(selector, 'title', index),
            price: parseFloat(await ui5.element.getPropertyValue(selector, 'number', index))
        };
    }

    async addProductToCart() {
        await this.click(this.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async openApp() {
        await common.navigation.navigateToUrl(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await ui5.assertion.expectToBeVisible(this.SEARCH_FIELD_SELECTOR);
    }

    async selectCategoryByName(categoryName) {
        const selector = this.getCategorySelectorByName(categoryName);
        await this.click(selector);
    }

    async openFilterDialog() {
        await this.click(this.FILTER_BUTTON_SELECTOR);
    }

    async confirmFilterSelection() {
        await this.click(this.OK_BUTTON_SELECTOR);
    }

    async goBackToCategory() {
        await this.click(this.BACK_BUTTON_SELECTOR);
    }

    async clickCartButton() {
        await this.addProductToCart();
    }

    async goToCart() {
        await this.click(this.CART_BUTTON_SELECTOR);
    }

    async getFirstProductDetails() {
        return {
            ...(await this.getListItemDetails(this.PRODUCT_ITEM_SELECTOR, 0)),
            quantity: 1
        };
    }

    async selectFirstProduct() {
        await this.click(this.PRODUCT_ITEM_SELECTOR, 0);
    }

    async filterByAvailability() {
        await this.openFilterDialog();
        await this.click(this.AVAILABILITY_CRITERION_SELECTOR);
        await this.click(this.AVAILABILITY_OPTION_SELECTOR);
        await this.confirmFilterSelection();
    }

    async searchProduct(name) {
        await ui5.userInteraction.searchFor(this.SEARCH_FIELD_SELECTOR, name);
    }

    async selectSearchedProduct() {
        const product = await this.getListItemDetails(this.SEARCH_RESULT_SELECTOR, 0);
        await this.click(this.SEARCH_RESULT_SELECTOR, 0);
        return product;
    }

    async searchAndSelectProduct(name) {
        await this.searchProduct(name);
        return await this.selectSearchedProduct();
    }
}

export default new HomePage();