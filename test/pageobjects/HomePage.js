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

    // ===== FILTER BY AVAILABILITY =====
    async filterByAvailability() {
        // Click the Filter button
        await ui5.userInteraction.click(this.FILTER_BUTTON_SELECTOR);

        // Click "Availability" in the filter list
        const filterItemSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: "Availability"
            }
        };
        await ui5.userInteraction.click(filterItemSelector);

        // Click the "Available" option under Availability
        const filterOptionSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.StandardListItem",
                title: "Available"
            }
        };
        await ui5.userInteraction.click(filterOptionSelector);

        // Click OK to apply the filter
        await ui5.userInteraction.click(this.OK_BUTTON_SELECTOR);

        await attachScreenshot('Products filtered by availability');
    }

    async selectFirstProductInCategory() {
        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
        await attachScreenshot('First Product in Category Selected');
    }

    async addProductToCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.Button",
                text: [{ path: "i18n>addToCartShort" }]
            }
        });
        await attachScreenshot('Product Added to Cart');
    }

    async openCartFromProductPage() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Product",
                metadata: "sap.m.ToggleButton"
            }
        });
        await attachScreenshot('Cart Opened from Product Page');
    }

    async addProductByNameToCart(productName, quantity) {
        const productSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Category",
                metadata: "sap.m.ObjectListItem",
                title: productName
            }
        };

        for (let i = 0; i < parseInt(quantity); i++) {
            await ui5.userInteraction.click(productSelector);
        }

        global.currentProduct = {
            name: productName,
            quantity: parseInt(quantity)
        };

        await attachScreenshot(`Added ${quantity}x ${productName} to cart`);
    }


    async selectAndStoreFirstProduct() {
        await ui5.element.getDisplayed(this.PRODUCT_ITEM_SELECTOR);

        const firstProductName = await ui5.element.getPropertyValue(
            {
                elementProperties: this.PRODUCT_ITEM_SELECTOR.elementProperties
            },
            'title',
        );

        const firstProductPrice = await ui5.element.getPropertyValue(
            {
                elementProperties: this.PRODUCT_ITEM_SELECTOR.elementProperties
            },
            'number',
            0
        );

        await ui5.userInteraction.click(this.PRODUCT_ITEM_SELECTOR, 0);
        await attachScreenshot(`First filtered product "${firstProductName}" selected`);

        global.currentProduct = {
            name: firstProductName,
            price: firstProductPrice,
            quantity: 1
        };
    }
}

export default new HomePage();