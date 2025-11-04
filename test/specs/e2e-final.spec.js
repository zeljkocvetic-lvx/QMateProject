import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';

describe('Home Page tests', () => {
    it('Full end-to-end checkout flow', async () => {
        const homePage = new HomePage();
        const cartPage = new CartPage();
        const checkoutPage = new CheckoutPage();

        await homePage.openApp();
        await homePage.addFirstItem();
        await homePage.openCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.clickStep2Next();
        await checkoutPage.clickStep3Payment();

        await checkoutPage.fillCreditCardDetails("John Doe", "4111111111111111", "123", "12/2026");
        await checkoutPage.clickStep4Next();

        await checkoutPage.fillDeliveryAddress("Main St", "Anytown", "12345", "USA");
        await checkoutPage.clickStep5Next();

        await checkoutPage.clickOrderSummaryNext();
        await checkoutPage.submitOrder();
        await checkoutPage.verifyOrderSuccess();
    });
});