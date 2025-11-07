// pageobjects/CheckoutPage.js
import { attachScreenshot } from '../helpers/screenshotHelper.js';

class CheckoutPage {
    constructor() {
        // Step Buttons
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

        // Credit Card Selectors
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

        // Delivery Address Selectors
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
        await attachScreenshot('Step 2 Next Clicked');
    }

    async clickStep3Payment() {
        await ui5.userInteraction.click(this.step3PaymentButton);
        await attachScreenshot('Step 3 Payment Clicked');
    }

    async clickStep4Next() {
        await ui5.userInteraction.click(this.step4NextButton);
        await attachScreenshot('Step 4 Next Clicked');
    }

    async clickStep5Next() {
        await ui5.userInteraction.click(this.step5NextButton);
        await attachScreenshot('Step 5 Next Clicked');
    }

    async clickOrderSummaryNext() {
        await ui5.userInteraction.click(this.orderSummaryNextButton);
        await attachScreenshot('Order Summary Next Clicked');
    }

    async submitOrder() {
        await ui5.userInteraction.click(this.submitOrderButton);
        await attachScreenshot('Submit Order Clicked');
        await ui5.userInteraction.click(this.confirmYesButton);
        await attachScreenshot('Confirm Yes Clicked');
    }

    async verifyOrderSuccess() {
        await ui5.assertion.expectToBeVisible(this.orderSuccessText);
        await attachScreenshot('Order Success Screen');
    }

    // Credit Card Atomic Actions
    async enterCardHolderName(name) {
        await ui5.userInteraction.clearAndFill(this.cardHolderInput, name);
        await attachScreenshot('Card Holder Entered');
    }

    async enterCardNumber(number) {
        await ui5.userInteraction.clearAndFill(this.cardNumberInput, number);
        await attachScreenshot('Card Number Entered');
    }

    async enterCVV(cvv) {
        await ui5.userInteraction.clearAndFill(this.cvvInput, cvv);
        await attachScreenshot('CVV Entered');
    }

    async enterExpirationDate(expiration) {
        await ui5.userInteraction.clearAndFill(this.expirationInput, expiration);
        await attachScreenshot('Expiration Date Entered');
    }

    async closeDatePicker() {
        await ui5.userInteraction.click(this.creditCardStepArea);
        await attachScreenshot('Date Picker Closed');
    }

    async fillCreditCardDetails(holderName, number, cvv, expiration) {
        await this.enterCardHolderName(holderName);
        await this.enterCardNumber(number);
        await this.enterCVV(cvv);
        await this.enterExpirationDate(expiration);
        await this.closeDatePicker();
        await attachScreenshot('Credit Card Details Filled');
    }

    // Delivery Address Atomic Actions
    async enterAddress(address) {
        await ui5.userInteraction.clearAndFill(this.addressInput, address);
        await attachScreenshot('Address Entered');
    }

    async enterCity(city) {
        await ui5.userInteraction.clearAndFill(this.cityInput, city);
        await attachScreenshot('City Entered');
    }

    async enterZip(zip) {
        await ui5.userInteraction.clearAndFill(this.zipInput, zip);
        await attachScreenshot('ZIP Entered');
    }

    async enterCountry(country) {
        await ui5.userInteraction.clearAndFill(this.countryInput, country);
        await attachScreenshot('Country Entered');
    }

    async blurField() {
        await nonUi5.userInteraction.click("body");
        await attachScreenshot('Field Blurred');
    }

    async fillDeliveryAddress(address, city, zip, country) {
        await this.enterAddress(address);
        await this.enterCity(city);
        await this.enterZip(zip);
        await this.enterCountry(country);
        await this.blurField();
        await attachScreenshot('Delivery Address Filled');
    }
}

export default new CheckoutPage();