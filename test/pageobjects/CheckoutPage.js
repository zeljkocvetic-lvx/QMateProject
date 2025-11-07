class CheckoutPage {
    constructor() {
        this.step2NextButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*contentsStep-nextButton"
            }
        };

        this.step3PaymentButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "container-cart---checkoutView--paymentTypeStep-nextButton"
            }
        };

        this.step4NextButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*creditCardStep-nextButton"
            }
        };

        this.step5NextButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*invoiceStep-nextButton"
            }
        };

        this.orderSummaryNextButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*deliveryTypeStep-nextButton"
            }
        };

        this.submitOrderButton = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*submitOrder"
            }
        };

        this.confirmYesButton = {
            elementProperties: {
                metadata: "sap.m.Button",
                text: "Yes"
            }
        };

        this.orderSuccessText = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.OrderCompleted",
                metadata: "sap.m.FormattedText"
            }
        };

        // Credit Card Inputs
        this.cardHolderInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "container-cart---checkoutView--creditCardHolderName"
            }
        };

        this.cardNumberInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.MaskInput",
                id: "*creditCardNumber"
            }
        };

        this.cvvInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.MaskInput",
                id: "*creditCardSecurityNumber"
            }
        };

        this.expirationInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.DatePicker",
                id: "*creditCardExpirationDate"
            }
        };

        this.creditCardStepArea = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.WizardStep",
                id: "*creditCardStep"
            }
        };

        // Delivery Address Inputs
        this.addressInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressAddress"
            }
        };

        this.cityInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressCity"
            }
        };

        this.zipInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressZip"
            }
        };

        this.countryInput = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressCountry"
            }
        };
    }

    // Step Button Methods
    async clickStep2Next() {
        await ui5.userInteraction.click(this.step2NextButton);
    }

    async clickStep3Payment() {
        await ui5.userInteraction.click(this.step3PaymentButton);
    }

    async clickStep4Next() {
        await ui5.userInteraction.click(this.step4NextButton);
    }

    async clickStep5Next() {
        await ui5.userInteraction.click(this.step5NextButton);
    }

    async clickOrderSummaryNext() {
        await ui5.userInteraction.click(this.orderSummaryNextButton);
    }

    async submitOrder() {
        await ui5.userInteraction.click(this.submitOrderButton);
        await ui5.userInteraction.click(this.confirmYesButton);
    }

    async verifyOrderSuccess() {
        await ui5.assertion.expectToBeVisible(this.orderSuccessText);
    }

    // Credit Card Atomic Actions
    async enterCardHolderName(name) {
        await ui5.userInteraction.clearAndFill(this.cardHolderInput, name);
    }

    async enterCardNumber(number) {
        await ui5.userInteraction.clearAndFill(this.cardNumberInput, number);
    }

    async enterCVV(cvv) {
        await ui5.userInteraction.clearAndFill(this.cvvInput, cvv);
    }

    async enterExpirationDate(expiration) {
        await ui5.userInteraction.clearAndFill(this.expirationInput, expiration);
    }

    async closeDatePicker() {
        await ui5.userInteraction.click(this.creditCardStepArea);
    }

    // Delivery Address Atomic Actions
    async enterAddress(address) {
        await ui5.userInteraction.clearAndFill(this.addressInput, address);
    }

    async enterCity(city) {
        await ui5.userInteraction.clearAndFill(this.cityInput, city);
    }

    async enterZip(zip) {
        await ui5.userInteraction.clearAndFill(this.zipInput, zip);
    }

    async enterCountry(country) {
        await ui5.userInteraction.clearAndFill(this.countryInput, country);
    }

    async blurField() {
        await nonUi5.userInteraction.click("body");
    }
}

export default new CheckoutPage();