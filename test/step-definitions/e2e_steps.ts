import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.ts';
import ProductPage from '../pageobjects/ProductPage.ts';
import CartPage from '../pageobjects/CartPage.ts';
import { attachScreenshot } from '../helpers/screenshotHelper.ts';
import type { product } from '../support/productInterface.ts';

Given('Open the app', async function () {
    await HomePage.openApp();
    await attachScreenshot('Home Page Opened');
});

When('Select category {string}', async function (categoryName: string) {
    await HomePage.selectCategoryByName(categoryName);
    await attachScreenshot(`Category "${categoryName}" Selected`);
});

When('Filter products by availability', async function () {
    await HomePage.filterByAvailability();
    await attachScreenshot('Products Filtered by Availability');
});

When('Add first filtered product to cart', async function () {
    await HomePage.openFirstProduct();
    await ProductPage.waitForPageLoaded();

    const productDetails = await ProductPage.getProductDetails();
    const stored: product = {
        name: productDetails.name,
        price: productDetails.price,
        quantity: 1
    };
    this.addProductToStorage(stored);

    await ProductPage.clickAddToCartButton();

    await attachScreenshot(`First Product Added to Cart: ${productDetails.name}`);
});

When('Navigate back to the category page', async function () {
    await HomePage.goBackToCategory();
    await HomePage.waitForPageLoaded();
    await attachScreenshot('Returned to Category Page');
});

When('Search product {string} and add {int} items to cart', async function (productName: string, quantity: number) {
    await HomePage.searchProduct(productName);
    await HomePage.openFirstSearchResult();

    const productDetails = await ProductPage.getProductDetails();

    const stored: product = {
        name: productDetails.name,
        price: productDetails.price,
        quantity
    };
    this.addProductToStorage(stored);


    for (let i = 0; i < quantity; i++) {
        await ProductPage.clickAddToCartButton();
    }

    await attachScreenshot(`Searched Product Added to Cart: ${productDetails.name} x${quantity}`);
});

When('Navigate to the cart', async function () {
    await ProductPage.clickCartButton();
    await CartPage.waitForPageLoaded();
    await attachScreenshot('Navigated to Cart');
});

Then('Verify cart contains exactly the products added with correct name, quantity and price', async function () {
    const cartItems = await CartPage.getProducts();

    const Products = this.getProducts();
    const formatProduct = (product: product) => `${product.name}::${product.price}::${product.quantity}`;
    const actualCartProducts = cartItems.map(formatProduct).sort();
    const expectedCartProducts = Products.map(formatProduct).sort();

    await common.assertion.expectEqual(actualCartProducts, expectedCartProducts);
    await attachScreenshot('Final Cart Verification');
});