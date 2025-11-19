class CheckoutPage {
    constructor() {
        this.CART_ENTRY_SELECTOR = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.ObjectListItem",
                bindingContextPath: "/cartEntries/*"
            }
        };
    }
}

export default new CheckoutPage();