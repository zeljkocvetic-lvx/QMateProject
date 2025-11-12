import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import { attachScreenshot } from '../helpers/screenshotHelper.js';

Given('Open the app', async () => {
    await HomePage.openApp();
});

When('Select category {string}', async name => {
    await HomePage.selectCategoryByName(name);
});

When('Filter products by availability', async () => {
    await HomePage.filterByAvailability();
});

When('Add first filtered product to cart', async () => {
    await HomePage.selectAndStoreFirstProduct();
    await HomePage.addProductToCart();
});

When('Search product {string} and add {string} items to cart', async (name, qty) => {
    await HomePage.searchProductAndAddToCart(name, parseInt(qty));
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
});

When('Navigate to the cart', async () => {
    await HomePage.goToCart();
});

Then('Verify cart contains exactly 2 products with correct name, quantity and price', async () => {
    const cartItems = await CartPage.getCartItems();

    if (!cartItems || cartItems.length === 0) {
        await attachScreenshot('EmptyCart');
        throw new Error('No products displayed in cart');
    }

    if (cartItems.length !== 2) {
        await attachScreenshot('UnexpectedCartCount');
        throw new Error(`Expected 2 products in cart, found ${cartItems.length}`);
    }

    const [first, second] = [global.filteredProduct, global.secondProduct];

    const check = (expected) => {
        const found = cartItems.find(i => i.name === expected.name);
        if (!found) throw new Error(`Product "${expected.name}" not found`);
        if (found.quantity !== expected.quantity)
            throw new Error(`Quantity mismatch for "${expected.name}": expected ${expected.quantity}, got ${found.quantity}`);
        if (found.price !== expected.price)
            throw new Error(`Price mismatch for "${expected.name}": expected ${expected.price}, got ${found.price}`);
    };

    check(first);
    check(second);

    await attachScreenshot('CartVerificationSuccess');
});