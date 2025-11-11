import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';

Given('the app is opened', async () => await HomePage.openApp());

When('I select category {string}', async name => await HomePage.selectCategoryByName(name));
When('I filter products by availability', async () => await HomePage.filterByAvailability());
When('I add the first filtered product to the cart', async () => {
    await HomePage.selectAndStoreFirstProduct();
    await HomePage.addProductToCart();
});
When('I search product {string} and add {string} items to the cart', async (name, qty) =>
    await HomePage.searchProductAndAddToCart(name, parseInt(qty))
);
When('I navigate back to the category page', async () => await HomePage.goBackToCategory());
When('I navigate to the cart', async () => await HomePage.goToCart());

Then('the cart should contain exactly 2 products with correct name, quantity and price', async () => {
    const items = await CheckoutPage.getCartItems();
    if (items.length !== 2) throw new Error(`Expected 2 products in cart, found ${items.length}`);

    const [first, second] = [global.filteredProduct, global.secondProduct];

    const check = (expected) => {
        const found = items.find(i => i.name === expected.name);
        if (!found) throw new Error(`Product "${expected.name}" not found`);
        if (found.quantity !== expected.quantity) throw new Error(`Quantity mismatch for "${expected.name}": expected ${expected.quantity}, got ${found.quantity}`);
        if (found.price !== expected.price) throw new Error(`Price mismatch for "${expected.name}": expected ${expected.price}, got ${found.price}`);
    };

    check(first);
    check(second);
});