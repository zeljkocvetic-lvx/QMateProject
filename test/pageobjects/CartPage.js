// pageobjects/CartPage.js
export default class CartPage {
    constructor() {}

    async proceedToCheckout() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Button",
                text: "Proceed"
            }
        });
    }
}