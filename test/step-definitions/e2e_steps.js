import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import { attachScreenshot } from '../helpers/screenshotHelper.js';

Given('the app is opened', async () => {
    await HomePage.openApp();
});

When('I select category {string}', async (categoryName) => {
    await HomePage.selectCategoryByName(categoryName);
    await HomePage.filterByAvailability();
});

When('I add the first filtered product to the cart', async () => {
    await HomePage.selectAndStoreFirstProduct();
    await HomePage.addProductToCart();
});

When('I search product {string} and add {string} items to the cart', async (productName, quantity) => {
    await HomePage.addProductByNameToCart(productName, quantity);
});

Then('I should see the filtered product in the cart with correct quantity', async () => {
    const product = global.filteredProduct;
    await CartPage.verifyProductQuantityByBindingPath(`/Products('${product.name}')`, product.quantity);
    await attachScreenshot(`Verified filtered product: ${product.name}`);
});

Then('I should see the searched product in the cart with correct quantity', async () => {
    const product = global.searchedProduct;
    await CartPage.verifyProductQuantityByBindingPath(`/Products('${product.name}')`, product.quantity);
    await attachScreenshot(`Verified searched product: ${product.name}`);
});

Then('I proceed to checkout', async () => {
    await CartPage.proceedToCheckout();
});