import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';

Given('the app is opened', async () => {
    await HomePage.openApp();
});

When('I select category {string}', async (categoryName) => {
    await HomePage.selectCategoryByName(categoryName);
});

When('I filter products by availability', async () => {
    await HomePage.filterByAvailability();
});

When('I add the first filtered product to the cart', async () => {
    await HomePage.selectAndStoreFirstProduct();
    await HomePage.addProductToCart();
    await HomePage.goBackToCategory();
});
When("I navigate back to the category page", async function () {
    const backButtonSelector = {
        elementProperties: {
            viewName: "sap.ui.demo.cart.view.Category",
            metadata: "sap.m.Button",
            id: "*page-navButton"
        }
    };

    await new Promise((resolve, reject) => {
        ui5.userInteraction.click(backButtonSelector, 0, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });

    await attachScreenshot("Navigated back to category page");
});

When('I search product {string} and add {string} items to the cart', async (productName, quantity) => {
    await HomePage.searchProductAndAddToCart(productName, quantity);
});

Then('the cart should contain exactly 2 products with correct name, quantity and price', async () => {
    await CartPage.openCart();
    await CartPage.validateCartProducts();
});

Then('I proceed to checkout', async () => {
    await CartPage.proceedToCheckout();
});