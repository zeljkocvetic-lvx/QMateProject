// pageobjects/CheckoutPage.js
export default class CheckoutPage {
    constructor() {}

    // Step 2 Next button
    async clickStep2Next() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*contentsStep-nextButton"
            }
        });
    }

    // Step 3 Payment step button
    async clickStep3Payment() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "container-cart---checkoutView--paymentTypeStep-nextButton"
            }
        });
    }

    // Fill credit card details
    async fillCreditCardDetails(holderName, number, cvv, expiration) {
        // Holder name
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "container-cart---checkoutView--creditCardHolderName"
            }
        }, holderName);

        // Card number
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.MaskInput",
                id: "*creditCardNumber"
            }
        }, number);

        // CVV
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.MaskInput",
                id: "*creditCardSecurityNumber"
            }
        }, cvv);

        // Expiration date
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.DatePicker",
                id: "*creditCardExpirationDate"
            }
        }, expiration);

        // Click blank space to close date picker
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.WizardStep",
                id: "*creditCardStep"
            }
        });
    }

    // Step 4 Next button (after credit card)
    async clickStep4Next() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*creditCardStep-nextButton"
            }
        });
    }

    // Fill delivery address
    async fillDeliveryAddress(address, city, zip, country) {
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressAddress"
            }
        }, address);

        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressCity"
            }
        }, city);

        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressZip"
            }
        }, zip);

        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressCountry"
            }
        }, country);

        // Blur field by clicking outside
        await nonUi5.userInteraction.click("body");
    }

    // Step 5 Next button (Review step)
    async clickStep5Next() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*invoiceStep-nextButton"
            }
        });
    }

    // Order Summary step
    async clickOrderSummaryNext() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*deliveryTypeStep-nextButton"
            }
        });
    }

    // Submit Order
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
        await browser.pause(3000);
    }

    // Verify success
    async verifyOrderSuccess() {
        await ui5.assertion.expectToBeVisible({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.OrderCompleted",
                metadata: "sap.m.FormattedText"
            }
        });
        await browser.pause(3000);
    }
}