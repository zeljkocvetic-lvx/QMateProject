import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
    constructor() {
        this.filteredProduct = null;
        this.secondProduct = null;
    }
}

setWorldConstructor(CustomWorld);