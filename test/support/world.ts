import { setWorldConstructor } from '@cucumber/cucumber';
import type { Product } from './productInterface.ts';

export class CustomWorld {
    private addedProducts: Product[];

    constructor() {
        this.addedProducts = [];
    }

    addProductToStorage(product: Product) {
        const existing = this.addedProducts.find(p => p.name === product.name);
        if (existing) {
            existing.quantity += product.quantity;
        } else {
            this.addedProducts.push({ ...product });
        }
    }

    getProducts(): Product[] {
        return [...this.addedProducts];
    }
}
export default CustomWorld;
setWorldConstructor(CustomWorld);