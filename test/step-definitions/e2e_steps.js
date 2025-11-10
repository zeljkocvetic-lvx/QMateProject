import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';

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
});

When('I navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
});

When('I search product {string} and add {string} items to the cart', async (productName, quantity) => {
    await HomePage.searchProductAndAddToCart(productName, quantity);
});

Then('the cart should contain exactly 2 products with correct name, quantity and price', async () => {
    const cartItems = await CheckoutPage.getCartItems();

    if (cartItems.length !== 2) {
        throw new Error(`Expected 2 products in cart, but found ${cartItems.length}`);
    }

    const firstProduct = global.filteredProduct;
    const secondProduct = await browser.sharedStore.get('secondProduct');

    const firstItem = cartItems.find(item => item.name === firstProduct.name);
    const secondItem = cartItems.find(item => item.name === secondProduct.name);

    if (!firstItem) throw new Error(`First filtered product "${firstProduct.name}" not found in cart`);
    if (firstItem.quantity !== firstProduct.quantity) throw new Error(`Quantity mismatch for first product: expected ${firstProduct.quantity}, found ${firstItem.quantity}`);
    if (firstItem.price !== firstProduct.price) throw new Error(`Price mismatch for first product: expected ${firstProduct.price}, found ${firstItem.price}`);

    if (!secondItem) throw new Error(`Second searched product "${secondProduct.name}" not found in cart`);
    if (secondItem.quantity !== parseInt(secondProduct.quantity)) throw new Error(`Quantity mismatch for second product: expected ${secondProduct.quantity}, found ${secondItem.quantity}`);
});

When('I proceed to checkout', async () => {
    await CheckoutPage.proceedToCheckout();
});