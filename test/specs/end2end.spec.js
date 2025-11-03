describe('Home Page tests', () => {

    it('Add item', async () => {

const addButtonSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Welcome",
                "metadata": "sap.m.Button",
                "bindingContextPath": "/Promoted/0"
            }
        };
        await ui5.userInteraction.click(addButtonSelector);

const cartButtonSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Welcome",
                "metadata": "sap.m.ToggleButton"
            }
        };
        await ui5.userInteraction.click(cartButtonSelector);
        await browser.pause(5000);
    });
});