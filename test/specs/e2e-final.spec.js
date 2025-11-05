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

        await CheckoutPage.fillCreditCardDetails("John Doe", "4111111111111111", "123", "12/2026");
        await CheckoutPage.clickStep4Next();

        await CheckoutPage.fillDeliveryAddress("Main St", "Anytown", "12345", "USA");
        await CheckoutPage.clickStep5Next();

        await CheckoutPage.clickOrderSummaryNext();
        await CheckoutPage.submitOrder();
        await CheckoutPage.verifyOrderSuccess();
    });
});