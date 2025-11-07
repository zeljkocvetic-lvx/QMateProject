import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';

describe('Home Page tests', () => {
    it('Full end-to-end checkout flow', async () => {

        await HomePage.openApp();
        await HomePage.addFirstItem();
        await HomePage.openCart();
        await CartPage.proceedToCheckout();

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
        await CheckoutPage.verifyOrderSuccess();
    });
});