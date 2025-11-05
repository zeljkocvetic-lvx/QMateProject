// pageobjects/CheckoutPage.js
export default class CheckoutPage {
    //constructor() {}

    
    // Step buttons
    
    async clickStep2Next() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*contentsStep-nextButton"
            }
        });
    }

    async clickStep3Payment() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "container-cart---checkoutView--paymentTypeStep-nextButton"
            }
        });
    }

    async clickStep4Next() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*creditCardStep-nextButton"
            }
        });
    }

    async clickStep5Next() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*invoiceStep-nextButton"
            }
        });
    }

    async clickOrderSummaryNext() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*deliveryTypeStep-nextButton"
            }
        });
    }

    async submitOrder() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*submitOrder"
            }
        });

        // Confirm selection
        await ui5.userInteraction.click({
            elementProperties: {
                metadata: "sap.m.Button",
                text: "Yes"
            }
        });
    }

    async verifyOrderSuccess() {
        await ui5.assertion.expectToBeVisible({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.OrderCompleted",
                metadata: "sap.m.FormattedText"
            }
        });
    }

    
    // Credit Card Atomic Actions
    
    async enterCardHolderName(name) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "container-cart---checkoutView--creditCardHolderName"
            }
        }, name);
    }

    async enterCardNumber(number) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.MaskInput",
                id: "*creditCardNumber"
            }
        }, number);
    }

    async enterCVV(cvv) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.MaskInput",
                id: "*creditCardSecurityNumber"
            }
        }, cvv);
    }

    async enterExpirationDate(expiration) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.DatePicker",
                id: "*creditCardExpirationDate"
            }
        }, expiration);
    }

    async closeDatePicker() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.WizardStep",
                id: "*creditCardStep"
            }
        });
    }

    // Grouped method for backward compatibility
    async fillCreditCardDetails(holderName, number, cvv, expiration) {
        await this.enterCardHolderName(holderName);
        await this.enterCardNumber(number);
        await this.enterCVV(cvv);
        await this.enterExpirationDate(expiration);
        await this.closeDatePicker();
    }

    
    // Delivery Address Atomic Actions
    
    async enterAddress(address) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressAddress"
            }
        }, address);
    }

    async enterCity(city) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressCity"
            }
        }, city);
    }

    async enterZip(zip) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressZip"
            }
        }, zip);
    }

    async enterCountry(country) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressCountry"
            }
        }, country);
    }

    async blurField() {
        await nonUi5.userInteraction.click("body");
    }

    // Grouped method for backward compatibility
    async fillDeliveryAddress(address, city, zip, country) {
        await this.enterAddress(address);
        await this.enterCity(city);
        await this.enterZip(zip);
        await this.enterCountry(country);
        await this.blurField();
    }
}