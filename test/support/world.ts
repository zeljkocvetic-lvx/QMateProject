import { setWorldConstructor } from '@cucumber/cucumber';
import type { product } from './productInterface.ts';

export class CustomWorld {
    private addedProducts: product[];

    constructor() {
        this.addedProducts = [];
    }

    addProductToStorage(product: product) {
        const existing = this.addedProducts.find(p => p.name === product.name);
        if (existing) {
            existing.quantity += product.quantity;
        } else {
            this.addedProducts.push({ ...product });
        }
    }

    getProducts(): product[] {
        return [...this.addedProducts];
    }
}
export default CustomWorld;
setWorldConstructor(CustomWorld);