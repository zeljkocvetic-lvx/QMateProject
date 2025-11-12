import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';
import { attachScreenshot } from '../helpers/screenshotHelper.js';

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
    await HomePage.selectFirstProduct();
    await HomePage.addProductToCart();
    global.filteredProduct = { ...product, quantity: 1 };
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
});

When('Search product {string} and add {string} items to cart', async (name, qty) => {
    const quantity = parseInt(qty);
    await HomePage.searchProduct(name);
    const product = await HomePage.selectSearchedProduct();
    await HomePage.addProductToCart(quantity);

    global.secondProduct = { ...product, quantity };
});

When('Navigate to the cart', async () => {
    await HomePage.goToCart();
});

Then(
    'Verify cart contains exactly the products added with correct name, quantity and price',
    async () => {
        const items = await CheckoutPage.getCartItems();

        if (!items || items.length === 0) throw new Error('No products displayed in cart');

        const expectedProducts = [global.filteredProduct, global.secondProduct];

        const aggregatedItems = items.reduce((acc, item) => {
            if (!acc[item.name]) {
                acc[item.name] = { ...item };
            } else {
                acc[item.name].quantity += item.quantity;
            }
            return acc;
        }, {});

        expectedProducts.forEach(expectedProduct => {
            const actual = aggregatedItems[expectedProduct.name];
            if (!actual) throw new Error(`Product "${expectedProduct.name}" not found in cart`);
            if (actual.quantity !== expectedProduct.quantity)
                throw new Error(
                    `Quantity mismatch for "${expectedProduct.name}": expected ${expectedProduct.quantity}, got ${actual.quantity}`
                );
            if (actual.price !== expectedProduct.price)
                throw new Error(
                    `Price mismatch for "${expectedProduct.name}": expected ${expectedProduct.price}, got ${actual.price}`
                );
        });

        await browser.pause(1000);
        await attachScreenshot('Final Cart Verification');
    }
);