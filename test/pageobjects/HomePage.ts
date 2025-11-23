import { BasePage } from './BasePage.ts';

export class HomePage extends BasePage {
    SEARCH_FIELD_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Home",
            metadata: "sap.m.SearchField",
            id: "*searchField"
        }
    };

    PRODUCT_ITEM_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Category",
            metadata: "sap.m.ObjectListItem"
        }
    };

    SEARCH_RESULT_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Home",
            metadata: "sap.m.ObjectListItem"
        }
    };

    FILTER_BUTTON_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Category",
            metadata: "sap.m.Button",
            id: "*masterListFilterButton"
        }
    };

    AVAILABILITY_CRITERION_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Category",
            metadata: "sap.m.StandardListItem",
            title: "Availability"
        }
    };

    AVAILABILITY_OPTION_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Category",
            metadata: "sap.m.StandardListItem",
            title: "Available"
        }
    };

    OK_BUTTON_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Category",
            metadata: "sap.m.Button",
            id: "*categoryFilterDialog-acceptbutton"
        }
    };

    BACK_BUTTON_SELECTOR = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Category",
            metadata: "sap.m.Button",
            id: "*page-navButton"
        }
    };

    async waitForPageLoaded(): Promise<void> {
        await ui5.assertion.expectToBeVisible(this.SEARCH_FIELD_SELECTOR);
    }

    async openApp(): Promise<void> {
        await common.navigation.navigateToUrl(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await this.waitForPageLoaded();
    }

    getCategorySelector(categoryName: string): any {
        return {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Home",
                metadata: "sap.m.StandardListItem",
                title: categoryName
            }
        };
    }

    async selectCategoryByName(categoryName: string): Promise<void> {
        const selector = this.getCategorySelector(categoryName);
        await ui5.userInteraction.click(selector);
    }

    async goBackToCategory(): Promise<void> {
        await ui5.userInteraction.click(this.BACK_BUTTON_SELECTOR);
    }

    async filterByAvailability(): Promise<void> {
        await ui5.userInteraction.click(this.FILTER_BUTTON_SELECTOR);
        await ui5.userInteraction.click(this.AVAILABILITY_CRITERION_SELECTOR);
        await ui5.userInteraction.click(this.AVAILABILITY_OPTION_SELECTOR);
        await ui5.userInteraction.click(this.OK_BUTTON_SELECTOR);
    }

    async searchProduct(name: string): Promise<void> {
        await ui5.userInteraction.searchFor(this.SEARCH_FIELD_SELECTOR, name);
    }

    async openFirstProduct(): Promise<void> {
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
    }

    async openFirstSearchResult(): Promise<void> {
        await ui5.userInteraction.click(this.SEARCH_RESULT_SELECTOR, 0);
    }
}

export default new HomePage();