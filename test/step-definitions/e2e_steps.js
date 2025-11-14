import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import CartPage from '../pageobjects/CartPage.js';
import { attachScreenshot } from '../helpers/screenshotHelper.js';

Given('Open the app', async () => {
    await HomePage.openApp();
    await attachScreenshot('Home Page Opened');
});

When('Select category {string}', async (categoryName) => {
    await HomePage.selectCategoryByName(categoryName);
    await attachScreenshot(`Category "${categoryName}" Selected`);
});

When('Filter products by availability', async () => {
    await HomePage.filterByAvailability();
    await attachScreenshot('Products Filtered by Availability');
});

When('Add first filtered product to cart', async function () {
    const firstProduct = await HomePage.getFirstProductDetails();
    await HomePage.selectFirstProduct();
    await HomePage.clickCartButton();
    this.addProduct({ ...firstProduct, quantity: 1 });
    await attachScreenshot(`First Product Added to Cart: ${firstProduct.name}`);
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
    await attachScreenshot('Returned to Category Page');
});

When('Search product {string} and add {string} items to cart', async function (productName, quantityStr) {
    const quantity = parseInt(quantityStr, 10);
    const searchedProduct = await HomePage.searchAndSelectProduct(productName);
    for (let i = 0; i < quantity; i++) {
        await HomePage.clickCartButton();
    }
    this.addProduct({ ...searchedProduct, quantity });
    await attachScreenshot(`Searched Product Added to Cart: ${searchedProduct.name} x${quantity}`);
});

When('Navigate to the cart', async () => {
    await HomePage.goToCart();
    await attachScreenshot('Navigated to Cart');
});

Then('Verify cart contains exactly the products added with correct name, quantity and price', async function () {
    const cartItems = await CartPage.getCartItems();
    await attachScreenshot('Cart Items Retrieved');

    const expectedProducts = this.getProducts();

    const aggregatedCart = cartItems.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = { ...item };
        } else {
            acc[item.name].quantity += item.quantity;
        }
        return acc;
    }, {});

    expectedProducts.forEach(expected => {
        const actual = aggregatedCart[expected.name];
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    await attachScreenshot('Final Cart Verification');
});