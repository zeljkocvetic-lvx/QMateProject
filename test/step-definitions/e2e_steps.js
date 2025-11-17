import { Given, When, Then } from '@cucumber/cucumber';
import HomePage from '../pageobjects/HomePage.js';
import ProductPage from '../pageobjects/ProductPage.js';
import CartPage from '../pageobjects/CartPage.js';
import { attachScreenshot } from '../helpers/screenshotHelper.js';

Given('Open the app', async function () {
    this.clearProducts && this.clearProducts();
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
    const productDetails = await HomePage.getFirstProductDetails();
    await HomePage.selectFirstProduct();
    await ProductPage.clickCartButton();

    this.addProduct && this.addProduct({ ...productDetails, quantity: 1 });
    await attachScreenshot(`First Product Added to Cart: ${productDetails.name}`);
});

When('Navigate back to the category page', async () => {
    await HomePage.goBackToCategory();
    await attachScreenshot('Returned to Category Page');
});

When('Search product {string} and add {int} items to cart', async function (productName, quantity) {
    await HomePage.searchProduct(productName);
    const productDetails = await HomePage.selectSearchedProduct();

    for (let i = 0; i < quantity; i++) {
        await ProductPage.clickCartButton();
    }

    this.addProduct && this.addProduct({ ...productDetails, quantity });
    await attachScreenshot(`Searched Product Added to Cart: ${productDetails.name} x${quantity}`);
});

When('Navigate to the cart', async () => {
    await ProductPage.goToCart();
    await attachScreenshot('Navigated to Cart');
});

Then('Verify cart contains exactly the products added with correct name, quantity and price', async function () {
    const cartItems = await CartPage.getCartItems();
    await attachScreenshot('Cart Items Retrieved');

    const expectedProducts = (this.getProducts && this.getProducts()) || [];

    const normalize = p => `${p.name}::${p.price}::${p.quantity}`;
    const actualSet = cartItems.map(normalize).sort();
    const expectedSet = expectedProducts.map(normalize).sort();

    expect(actualSet).toEqual(expectedSet);

    await attachScreenshot('Final Cart Verification');
});