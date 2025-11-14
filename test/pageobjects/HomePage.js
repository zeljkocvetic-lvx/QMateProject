class HomePage {
    constructor() {
        //  Selectors 
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

    // Navigation and actions

    async openApp() {
        await common.navigation.navigateToUrl(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );

        await ui5.assertion.expectToBeVisible(this.SEARCH_FIELD_SELECTOR);
    }

    async selectCategoryByName(categoryName) {
        const selector = {
            ...this.CATEGORY_ITEM_SELECTOR,
            elementProperties: {
                ...this.CATEGORY_ITEM_SELECTOR.elementProperties,
                title: categoryName
            }
        };

        await ui5.assertion.expectToBeVisible(selector);
        await ui5.userInteraction.click(selector);
    }

    async openFilterDialog() {
        await ui5.userInteraction.click(this.FILTER_BUTTON_SELECTOR);
    }

    async selectFilterCriterion(criterion) {
        const selector = {
            ...this.CATEGORY_ITEM_SELECTOR,
            elementProperties: {
                ...this.CATEGORY_ITEM_SELECTOR.elementProperties,
                title: criterion
            }
        };
        await ui5.userInteraction.click(selector);
    }

    async selectFilterOption(option) {
        const selector = {
            ...this.CATEGORY_ITEM_SELECTOR,
            elementProperties: {
                ...this.CATEGORY_ITEM_SELECTOR.elementProperties,
                title: option
            }
        };
        await ui5.userInteraction.click(selector);
    }

    async confirmFilterSelection() {
        await ui5.userInteraction.click(this.OK_BUTTON_SELECTOR);
    }

    // Product handling

    async getFirstProductDetails() {
        const product = {
            name: await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'title', 0),
            price: parseFloat(await ui5.element.getPropertyValue(this.PRODUCT_ITEM_SELECTOR, 'number', 0)),
            quantity: 1
        };

        return product;
    }

    async selectFirstProduct() {
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
    }

    async clickCartButton() {
        await ui5.userInteraction.click(this.ADD_TO_CART_BUTTON_SELECTOR);
    }

    async goBackToCategory() {
        await ui5.userInteraction.click(this.BACK_BUTTON_SELECTOR);
    }

    async searchProduct(name) {
        await ui5.userInteraction.fill(this.SEARCH_FIELD_SELECTOR, name);
        await browser.keys('Enter');
    }

    async selectSearchedProduct() {
        await ui5.assertion.expectToBeVisible(this.SEARCH_RESULT_SELECTOR);

        const product = {
            name: await ui5.element.getPropertyValue(this.SEARCH_RESULT_SELECTOR, 'title', 0),
            price: parseFloat(await ui5.element.getPropertyValue(this.SEARCH_RESULT_SELECTOR, 'number', 0))
        };

        await ui5.userInteraction.click(this.SEARCH_RESULT_SELECTOR, 0);
        return product;
    }

    async goToCart() {
        await ui5.userInteraction.click(this.CART_BUTTON_SELECTOR);
    }
}

export default new HomePage();