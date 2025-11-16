import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
    constructor() {
        this.cartProducts = [];
    }

    addProduct(product) {
        const existing = this.cartProducts.find(p => p.name === product.name);

        if (existing) {
            // quantity is incremented, price is assumed the same
            existing.quantity += product.quantity;
        } else {
            this.cartProducts.push({ ...product });
        }
    }

    getProducts() {
        // Return a shallow copy to avoid external mutation of world state
        return [...this.cartProducts];
    }

    clearProducts() {
        this.cartProducts = [];
    }

    getProductByNameAndPrice(name, price) {
        const product = this.cartProducts.find(p => p.name === name && p.price === price);
        expect(product, `Product "${name}" with price ${price} should exist in world`).toBeDefined();
        return product;
    }
}

setWorldConstructor(CustomWorld);