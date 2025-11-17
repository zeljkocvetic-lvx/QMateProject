import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
    constructor() {
        this.cartProducts = [];
    }

    addProduct(product) {
        const existing = this.cartProducts.find(p => p.name === product.name);

        if (existing) {
            existing.quantity += product.quantity;
        } else {
            this.cartProducts.push({ ...product });
        }
    }

    getProducts() {
        return [...this.cartProducts];
    }

}

setWorldConstructor(CustomWorld);