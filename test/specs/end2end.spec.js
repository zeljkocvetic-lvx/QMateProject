describe('Home Page tests', () => {

    it('Full end-to-end checkout flow', async () => {

        // Open SAPUI5 Cart demo app
        await browser.url('https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon');
        await browser.pause(3000);

        // Step 1: Add an item
        const addButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.Button",
                bindingContextPath: "/Promoted/0"
            }
        };
        await ui5.userInteraction.click(addButtonSelector);

        // Step 2: Open Cart
        const cartButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.ToggleButton"
            }
        };
        await ui5.userInteraction.click(cartButtonSelector);
        await browser.pause(2000);

        // Step 3: Proceed to Checkout
        const proceedButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Cart",
                metadata: "sap.m.Button",
                text: "Proceed"
            }
        };
        await ui5.userInteraction.click(proceedButtonSelector);

        // Step 4: Click Step 2 Next button
        const step2NextButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "*contentsStep-nextButton"
            }
        };
        await ui5.userInteraction.click(step2NextButtonSelector);

        // Step 5: Click Step 3 button (Payment step)
        const step3ButtonSelector = {
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Button",
                id: "container-cart---checkoutView--paymentTypeStep-nextButton"
            }
        };
        await ui5.userInteraction.click(step3ButtonSelector);

        // Fill credit card holder name
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "container-cart---checkoutView--creditCardHolderName"
            }
        }, "John Doe");


        // Fill credit card number
        await ui5.userInteraction.clearAndFill({
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.MaskInput",
                "id": "*creditCardNumber"
            }
        }, "4111111111111111");

        await ui5.userInteraction.clearAndFill({
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.MaskInput",
                "id": "*creditCardSecurityNumber"

            }
        }, "123");

        await ui5.userInteraction.clearAndFill(
            {
                "elementProperties": {
                    "viewName": "sap.ui.demo.cart.view.Checkout",
                    "metadata": "sap.m.DatePicker",
                    "id": "*creditCardExpirationDate"
                }

            }, "12/2026");

        // click on the blank space to close date picker popup
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.WizardStep",
                id: "*creditCardStep"
            }
        });

        // Step 4 button to go to fill out delivery details
        const step4nextButtonSelector = {

            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*creditCardStep-nextButton"
            }
        };
        await ui5.userInteraction.click(step4nextButtonSelector);

    
        // Fill delivery address

        //address
        await ui5.userInteraction.clearAndFill({
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Input",
                "id": "*invoiceAddressAddress"
            }
        }, "Main St");

        //city
        await ui5.userInteraction.clearAndFill({
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Input",
                "id": "*invoiceAddressCity"
            }
        }, "Anytown");

        //zip code
        await ui5.userInteraction.clearAndFill({
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Input",
                "id": "*invoiceAddressZip"
            }
        }, "12345");

        //country
        await ui5.userInteraction.clearAndFill({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Checkout",
                metadata: "sap.m.Input",
                id: "*invoiceAddressCountry"
            }
        }, "USA");

        // blur the field by clicking outside UI5
        await nonUi5.userInteraction.click("body");

        // Step 5: Click Step 5 Next button (Review step)
        const step5nextButtonSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*invoiceStep-nextButton"
            }
        };
        await ui5.userInteraction.click(step5nextButtonSelector);


        // Step 8: Order summary - Submit Order
        const OrderSummaryButtonSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*deliveryTypeStep-nextButton"
            }
        };
        await ui5.userInteraction.click(OrderSummaryButtonSelector);

        // Submit Order
        const SubmitButtonSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*submitOrder"
            }
        };
        await ui5.userInteraction.click(SubmitButtonSelector);

        // Confirming the choise

        const ConfirmingSelectionButtonSelector = {
            "elementProperties": {
                "metadata": "sap.m.Button",
                "text": "Yes"
            }
        };
        await ui5.userInteraction.click(ConfirmingSelectionButtonSelector);
        await browser.pause(3000);


        // Step 9: Verify success message
        const successTitleSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.OrderCompleted",
                "metadata": "sap.m.FormattedText"
            }
        };
        await ui5.assertion.expectToBeVisible(successTitleSelector);

        await browser.pause(3000);
    });
});