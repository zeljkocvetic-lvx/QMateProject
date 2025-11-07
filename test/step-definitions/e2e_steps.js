import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';

Given('I open the app', async () => {
    await HomePage.openApp();
});

When('I add the first promoted item to the cart and proceed to checkout', async () => {
    await HomePage.addFirstItem();
    await HomePage.openCart();
    await CartPage.proceedToCheckout();
});

When('I complete the checkout with test card and delivery details', async () => {
    await CheckoutPage.clickStep2Next();
    await CheckoutPage.clickStep3Payment();

    await CheckoutPage.enterCardHolderName("John Doe");
    await CheckoutPage.enterCardNumber("4111111111111111");
    await CheckoutPage.enterCVV("123");
    await CheckoutPage.enterExpirationDate("12/2026");
    await CheckoutPage.closeDatePicker();
    await CheckoutPage.clickStep4Next();

    await CheckoutPage.enterAddress("Main St");
    await CheckoutPage.enterCity("Anytown");
    await CheckoutPage.enterZip("12345");
    await CheckoutPage.enterCountry("USA");
    await CheckoutPage.blurField();
    await CheckoutPage.clickStep5Next();

    await CheckoutPage.clickOrderSummaryNext();
    await CheckoutPage.submitOrder();
});

Then('I should see the order submitted successfully', async () => {
    await CheckoutPage.verifyOrderSuccess();
});