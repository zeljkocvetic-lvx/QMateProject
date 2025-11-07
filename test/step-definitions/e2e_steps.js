import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';

Given('I open the app', async () => {
    await HomePage.openApp();
});

When('I add the first promoted item to the cart and proceed to checkout', async () => {
    await HomePage.addFirstPromotedItem();
    await HomePage.openCartFromWelcome();
    await CartPage.proceedToCheckout();
});

When('I go to the payment step', async () => {
    await CheckoutPage.clickStep2Next();
    await CheckoutPage.clickStep3Payment();
});

When(
    'I fill credit card details with holder {string}, number {string}, CVV {string} and expiration {string}',
    async (holder, number, cvv, expiration) => {
        await ui5.assertion.expectToBeVisible(CheckoutPage.cardHolderInput);
        await CheckoutPage.enterCardHolderName(holder);
        await CheckoutPage.enterCardNumber(number);
        await CheckoutPage.enterCVV(cvv);
        await CheckoutPage.enterExpirationDate(expiration);
        await CheckoutPage.closeDatePicker();
        await CheckoutPage.clickStep4Next();
    }
);

When(
    'I fill delivery address with {string}, {string}, {string}, {string}',
    async (address, city, zip, country) => {
        await CheckoutPage.enterAddress(address);
        await CheckoutPage.enterCity(city);
        await CheckoutPage.enterZip(zip);
        await CheckoutPage.enterCountry(country);
        await CheckoutPage.blurField();
        await CheckoutPage.clickStep5Next();
    }
);

When('I submit the order', async () => {
    await CheckoutPage.clickOrderSummaryNext();
    await CheckoutPage.submitOrder();
});

Then('I should see the order submitted successfully', async () => {
    await CheckoutPage.verifyOrderSuccess();
});