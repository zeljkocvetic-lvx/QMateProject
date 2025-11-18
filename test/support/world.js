// world.js
import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
    constructor() {
        this.addedProducts = [];
    }

    addProductToStorage(product) {
        const existing = this.addedProducts.find(p => p.name === product.name);
        if (existing) existing.quantity += product.quantity;
        else this.addedProducts.push({ ...product });
    }

    getStoredProducts() {
        return [...this.addedProducts];
    }
}

setWorldConstructor(CustomWorld);