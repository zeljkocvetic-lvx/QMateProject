import CartPage from '../pageobjects/CartPage.js';
import HomePage from '../pageobjects/HomePage.js';

describe('Home Page tests if selected products are in the cart', () => {
    it('should verify that 1 laptop and 2 mice are added to the cart', async () => {
        await HomePage.openApp();


        await HomePage.selectCategory('LT');
        await HomePage.selectFirstProductInCategory();
        await HomePage.addProductToCart();


        await HomePage.selectCategory('MI');
        await HomePage.selectFirstProductInCategory();
        await HomePage.addProductMultipleTimes(2);


        await HomePage.openCartFromProductPage();


        await CartPage.clickFirstProduct(); // Laptop
        await CartPage.clickProductByIndex(1); // Mice (assuming second product)
        await CartPage.verifyProductQuantityByIndex(1, 2);
    });
});