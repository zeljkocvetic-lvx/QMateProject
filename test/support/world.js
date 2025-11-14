import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
    constructor() {
        this.cartProducts = [];
    }

    addProduct(product) {
        const existing = this.cartProducts.find(p => p.name === product.name);
        if (existing) {
            existing.quantity += product.quantity;
            expect(existing.price, `Price mismatch for "${product.name}"`).toEqual(product.price);
        } else {
            this.cartProducts.push({ ...product });
        }
    }

    getProducts() {
        return [...this.cartProducts];
    }

    clearProducts() {
        this.cartProducts = [];
    }

    getProductByName(name) {
        const product = this.cartProducts.find(p => p.name === name);
        expect(product, `Product "${name}" should exist in world`).toBeDefined();
        return product;
    }
}

setWorldConstructor(CustomWorld);