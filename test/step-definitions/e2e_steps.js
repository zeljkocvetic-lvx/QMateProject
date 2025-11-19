import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import ProductPage from '../pageobjects/ProductPage.js';
import CartPage from '../pageobjects/CartPage.js';
import { attachScreenshot } from '../helpers/screenshotHelper.js';

Given('Open the app', async function () {
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
    await HomePage.openFirstProduct();

    const productDetails = await ProductPage.getProductDetails();
    await ProductPage.clickAddToCartButton();
    this.addProductToStorage(productDetails);
    await attachScreenshot(`First Product Added to Cart: ${productDetails.name}`);
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
    await attachScreenshot('Returned to Category Page');
});

When('Search product {string} and add {int} items to cart', async function (productName, quantity) {
    await HomePage.searchProduct(productName);
    await HomePage.openFirstSearchResult();

    const productDetails = await ProductPage.getProductDetails();
    for (let i = 0; i < quantity; i++) {
        await ProductPage.clickAddToCartButton();
    }

    productDetails.quantity = quantity;
    this.addProductToStorage(productDetails);

    await attachScreenshot(`Searched Product Added to Cart: ${productDetails.name} x${quantity}`);
});

When('Navigate to the cart', async () => {
    await ProductPage.clickCartButton();
    await attachScreenshot('Navigated to Cart');
});

Then('Verify cart contains exactly the products added with correct name, quantity and price', async function () {
    const cartItems = await CartPage.getCartItems();

    await attachScreenshot('Cart Items Retrieved');

    const storedProducts = this.getStoredProducts();
    const formatProductForComparison = product => `${product.name}::${product.price}::${product.quantity}`;
    const actualCartProducts = cartItems.map(formatProductForComparison).sort();
    const expectedCartProducts = storedProducts.map(formatProductForComparison).sort();

    await common.assertion.expectEqual(actualCartProducts, expectedCartProducts, 'Cart contents match the added products');

    await attachScreenshot('Final Cart Verification');
});