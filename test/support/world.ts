import { setWorldConstructor } from '@cucumber/cucumber';

export interface StoredProduct {
    name: string;
    price: number;
    quantity: number;
}

export class CustomWorld {
    public addedProducts: StoredProduct[];

    constructor() {
        this.addedProducts = [];
    }

    addProductToStorage(product: StoredProduct) {
        const existing = this.addedProducts.find(p => p.name === product.name);
        if (existing) {
            existing.quantity += product.quantity;
        } else {
            this.addedProducts.push({ ...product });
        }
    }

    getStoredProducts(): StoredProduct[] {
        return [...this.addedProducts];
    }
}
export default CustomWorld;
setWorldConstructor(CustomWorld);