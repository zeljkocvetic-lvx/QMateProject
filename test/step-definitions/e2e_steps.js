import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';

Given('Open the app', async () => {
    await HomePage.openApp();
});

When('Select category {string}', async (name) => {
    await HomePage.selectCategoryByName(name);
});

When('Filter products by availability', async () => {
    await HomePage.filterByAvailability();
});

When('Add first filtered product to cart', async () => {
    const product = await HomePage.getFirstProductDetails();
    global.filteredProduct = product;
    await HomePage.selectFirstProduct();
    await HomePage.addProductToCart();
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
});

When('Search product {string} and add {string} items to cart', async (name, qty) => {
    const product = await HomePage.searchProductAndAddToCart(name, parseInt(qty));
    global.secondProduct = product;
});

When('Navigate to the cart', async () => {
    await HomePage.goToCart();
});

Then('Verify cart contains exactly 2 products with correct name, quantity and price', async () => {
    const items = await CheckoutPage.getCartItems();

    if (!items || items.length === 0) {
        throw new Error('No products displayed in cart');
    }

    if (items.length !== 2) {
        throw new Error(`Expected 2 products in cart, found ${items.length}`);
    }

    const [first, second] = [global.filteredProduct, global.secondProduct];

    const validateProduct = (expected) => {
        const actual = items.find(i => i.name === expected.name);
        if (!actual) throw new Error(`Product "${expected.name}" not found in cart`);
        if (actual.quantity !== expected.quantity)
            throw new Error(`Quantity mismatch for "${expected.name}": expected ${expected.quantity}, got ${actual.quantity}`);
        if (actual.price !== expected.price)
            throw new Error(`Price mismatch for "${expected.name}": expected ${expected.price}, got ${actual.price}`);
    };

    validateProduct(first);
    validateProduct(second);
});