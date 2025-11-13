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

When('Add first filtered product to cart', async function () {
    const product = await HomePage.getFirstProductDetails();
    await HomePage.selectFirstProduct();
    await HomePage.addProductToCart();
    this.filteredProduct = { ...product, quantity: 1 };
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
});

When('Search product {string} and add {string} items to cart', async function (name, qty) {
    const quantity = parseInt(qty);
    await HomePage.searchProduct(name);
    const product = await HomePage.selectSearchedProduct();
    await HomePage.addProductToCart(quantity);
    this.secondProduct = { ...product, quantity };
});

When('Navigate to the cart', async () => {
    await HomePage.goToCart();
});

Then(
    'Verify cart contains exactly the products added with correct name, quantity and price',
    async function () {
        const items = await CheckoutPage.getCartItems();

        if (!items || items.length === 0) {
            throw new Error('No products displayed in cart');
        }

        const expectedProducts = [this.filteredProduct, this.secondProduct];

        // Aggregate items by name (in case quantities merge)
        const aggregatedItems = items.reduce((acc, item) => {
            if (!acc[item.name]) {
                acc[item.name] = { ...item };
            } else {
                acc[item.name].quantity += item.quantity;
            }
            return acc;
        }, {});

        for (const expectedProduct of expectedProducts) {
            const actual = aggregatedItems[expectedProduct.name];

            if (!actual) {
                throw new Error(`Product "${expectedProduct.name}" not found in cart`);
            }

            if (actual.quantity !== expectedProduct.quantity) {
                throw new Error(
                    `Quantity mismatch for "${expectedProduct.name}": expected ${expectedProduct.quantity}, got ${actual.quantity}`
                );
            }

            if (actual.price !== expectedProduct.price) {
                throw new Error(
                    `Price mismatch for "${expectedProduct.name}": expected ${expectedProduct.price}, got ${actual.price}`
                );
            }
        }

        await attachScreenshot('✅ Final Cart Verification');
    }
);