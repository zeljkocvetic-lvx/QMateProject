class CartPage {
    constructor() {
        this.proceedButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Button",
                text: "Proceed"
            }
        };

        this.productTextBase = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Text"
            }
        };

        this.productQuantityBase = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.StepInput"
            },
            propertyName: "value"
        };
    }

    async proceedToCheckout() {
        await ui5.userInteraction.click(this.proceedButton);
    }

    async verifyProductQuantityByBindingPath(bindingContextPath, expectedQuantity) {
        const quantity = await ui5.control.getProperty({
            elementProperties: {
                ...this.productQuantityBase.elementProperties,
                bindingContextPath
            },
            propertyName: this.productQuantityBase.propertyName
        });

        await ui5.assertion.expect(quantity).toEqual(expectedQuantity);
    }
}

export default new CartPage();