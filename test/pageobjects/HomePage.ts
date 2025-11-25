import { BasePage } from './BasePage.ts';
import { QmateSelector } from 'wdio-qmate-service/modules/ui5/types/ui5.types';

export class HomePage extends BasePage {
    private static readonly SEARCH_FIELD_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Home", metadata: "sap.m.SearchField", id: "*searchField" }
    };

    private static readonly PRODUCT_ITEM_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Category", metadata: "sap.m.ObjectListItem" }
    };

    private static readonly SEARCH_RESULT_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Home", metadata: "sap.m.ObjectListItem" }
    };

    private static readonly FILTER_BUTTON_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Category", metadata: "sap.m.Button", id: "*masterListFilterButton" }
    };

    private static readonly AVAILABILITY_CRITERION_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Category", metadata: "sap.m.StandardListItem", title: "Availability" }
    };

    private static readonly AVAILABILITY_OPTION_AVAILABLE_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Category", metadata: "sap.m.StandardListItem", title: "Available" }
    };

    private static readonly OK_BUTTON_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Category", metadata: "sap.m.Button", id: "*categoryFilterDialog-acceptbutton" }
    };

    private static readonly BACK_BUTTON_SELECTOR: QmateSelector = {
        elementProperties: { viewName: "sap.ui.demo.cart.view.Category", metadata: "sap.m.Button", id: "*page-navButton" }
    };

    async waitForPageLoaded(): Promise<void> {
        await ui5.assertion.expectToBeVisible(HomePage.SEARCH_FIELD_SELECTOR);
    }

    async openApp(): Promise<void> {
        await common.navigation.navigateToUrl(
            'https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon'
        );
        await this.waitForPageLoaded();
    }

    getCategorySelector(categoryName: string): QmateSelector {
        return { elementProperties: { viewName: "sap.ui.demo.cart.view.Home", metadata: "sap.m.StandardListItem", title: categoryName } };
    }

    async selectCategoryByName(categoryName: string): Promise<void> {
        await ui5.userInteraction.click(this.getCategorySelector(categoryName));
    }

    async goBackToCategory(): Promise<void> {
        await ui5.userInteraction.click(HomePage.BACK_BUTTON_SELECTOR);
    }

    async filterByAvailability(): Promise<void> {
        await ui5.userInteraction.click(HomePage.FILTER_BUTTON_SELECTOR);
        await ui5.userInteraction.click(HomePage.AVAILABILITY_CRITERION_SELECTOR);
        await ui5.userInteraction.click(HomePage.AVAILABILITY_OPTION_AVAILABLE_SELECTOR);
        await ui5.userInteraction.click(HomePage.OK_BUTTON_SELECTOR);
    }

    async searchProduct(name: string): Promise<void> {
        await ui5.userInteraction.searchFor(HomePage.SEARCH_FIELD_SELECTOR, name);
    }

    async openFirstProduct(): Promise<void> {
        await ui5.userInteraction.click(HomePage.PRODUCT_ITEM_SELECTOR, 0);
    }

    async openFirstSearchResult(): Promise<void> {
        await ui5.userInteraction.click(HomePage.SEARCH_RESULT_SELECTOR, 0);
    }
}

export default new HomePage();