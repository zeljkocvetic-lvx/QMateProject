export interface ProductDetails {
    name: string;
    price: number;
    quantity?: number;
}

export interface StoredProduct extends ProductDetails {
    quantity: number;
}

export interface CartItem extends StoredProduct { }


export interface QmateSelector {
    elementProperties: Record<string, any>;
    index?: number;
}