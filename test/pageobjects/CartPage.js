// pageobjects/CartPage.js
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

    async laptopInCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Text",
                bindingContextPath: "/cartEntries/HT-1251"
            }
        });
    }

    async miceInCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Text",
                bindingContextPath: "/cartEntries/HT-1068"
            }
        });
    }

    async verifyMiceQuantity(expectedQuantity) {
        const quantity = await ui5.control.getProperty({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.StepInput",
                bindingContextPath: "/cartEntries/HT-1068"
            },
            propertyName: "value"
        });

        expect(quantity).toEqual(expectedQuantity);
    }
}
export default new CartPage();