class HomePage {
    constructor() {
        // Search / category selectors
        this.SEARCH_FIELD_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.SearchField",
                id: "*searchField"
            }
        };
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

        // Filters and navigation
        this.FILTER_BUTTON_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.Button",
                id: "*masterListFilterButton"
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
    }

    async openApp() {
        await common.navigation.navigateToUrl(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await ui5.assertion.expectToBeVisible(this.SEARCH_FIELD_SELECTOR);
    }

    getCategorySelector(categoryName) {
        return {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                title: categoryName
            }
        };
    }

    async selectCategoryByName(categoryName) {
        const selector = this.getCategorySelector(categoryName);
        await ui5.userInteraction.click(selector);
    }

    async goBackToCategory() {
        await ui5.userInteraction.click(this.BACK_BUTTON_SELECTOR);
    }

    async filterByAvailability() {
        await ui5.userInteraction.click(this.FILTER_BUTTON_SELECTOR);
        await ui5.userInteraction.click(this.AVAILABILITY_CRITERION_SELECTOR);
        await ui5.userInteraction.click(this.AVAILABILITY_OPTION_SELECTOR);
        await ui5.userInteraction.click(this.OK_BUTTON_SELECTOR);
    }

    async searchProduct(name) {
        await ui5.userInteraction.searchFor(this.SEARCH_FIELD_SELECTOR, name);
    }

    // Product list navigation
    async openFirstProduct() {
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
    }

    async openFirstSearchResult() {
        await ui5.userInteraction.click(this.SEARCH_RESULT_SELECTOR, 0);
    }
}

export default new HomePage();