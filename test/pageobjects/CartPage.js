import assert from 'assert';

class CartPage {
    constructor() { }

    async proceedToCheckout() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Button",
                text: "Proceed"
            }
        });
    }

    async clickFirstProduct() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Text"
            },
            index: 0
        });
    }

    async clickProductByIndex(index) {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Text"
            },
            index
        });
    }

    async verifyProductQuantityByIndex(index, expectedQuantity) {
        const quantity = await ui5.control.getProperty({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.StepInput"
            },
            propertyName: "value",
            index
        });

        assert.strictEqual(quantity, expectedQuantity);
    }
}

export default new CartPage();