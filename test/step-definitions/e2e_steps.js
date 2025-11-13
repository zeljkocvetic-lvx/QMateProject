import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import { attachScreenshot } from '../helpers/screenshotHelper.js';

Given('Open the app', async () => {
    await HomePage.openApp();
    await attachScreenshot('Home Page Opened');
});

When('Select category {string}', async (name) => {
    await HomePage.selectCategoryByName(name);
    await attachScreenshot(`Category "${name}" Selected`);
});

When('Filter products by availability', async () => {
    await HomePage.openFilterDialog();
    await attachScreenshot('Filter Dialog Opened');

    const criterionSelector = HomePage.AVAILABILITY_CRITERION_SELECTOR;
    await ui5.assertion.expectToBeVisible(criterionSelector);
    await ui5.userInteraction.click(criterionSelector);
    await attachScreenshot('Availability Criterion Selected');

    const optionSelector = HomePage.AVAILABILITY_OPTION_SELECTOR;
    await ui5.assertion.expectToBeVisible(optionSelector);
    await ui5.userInteraction.click(optionSelector);
    await attachScreenshot('Available Option Selected');

    await HomePage.confirmFilterSelection();
    await attachScreenshot('Products Filtered by Availability');
});

When('Add first filtered product to cart', async function () {
    const product = await HomePage.getFirstProductDetails();
    await HomePage.selectFirstProduct();
    await HomePage.clickCartButton(); // Updated method
    this.filteredProduct = { ...product, quantity: 1 };
    await attachScreenshot(`First Product Added to Cart: ${product.name}`);
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
    await attachScreenshot('Returned to Category Page');
});

When('Search product {string} and add {string} items to cart', async function (name, qty) {
    const quantity = parseInt(qty, 10);
    await HomePage.searchProduct(name);
    const product = await HomePage.selectSearchedProduct();

    for (let i = 0; i < quantity; i++) {
        await HomePage.clickCartButton(); // Click once per quantity
    }

    this.secondProduct = { ...product, quantity };
    await attachScreenshot(`Searched Product Added to Cart: ${product.name} x${quantity}`);
});

When('Navigate to the cart', async () => {
    await HomePage.goToCart();
    await attachScreenshot('Navigated to Cart');
});

Then(
    'Verify cart contains exactly the products added with correct name, quantity and price',
    async function () {
        const cartItems = await CartPage.getCartItems();
        await attachScreenshot('Cart Items Retrieved');

        if (!cartItems || cartItems.length === 0) {
            throw new Error('No products displayed in cart');
        }

        const expectedProducts = [this.filteredProduct, this.secondProduct];

        const aggregatedCart = cartItems.reduce((acc, item) => {
            if (!acc[item.name]) {
                acc[item.name] = { ...item };
            } else {
                acc[item.name].quantity += item.quantity;
            }
            return acc;
        }, {});

        // Assertions
        for (const expected of expectedProducts) {
            const actual = aggregatedCart[expected.name];

            if (!actual) {
                throw new Error(`Product "${expected.name}" not found in cart`);
            }

            if (actual.quantity !== expected.quantity) {
                throw new Error(
                    `Quantity mismatch for "${expected.name}": expected ${expected.quantity}, got ${actual.quantity}`
                );
            }

            if (actual.price !== expected.price) {
                throw new Error(
                    `Price mismatch for "${expected.name}": expected ${expected.price}, got ${actual.price}`
                );
            }
        }

        await attachScreenshot('Final Cart Verification');
    }
);