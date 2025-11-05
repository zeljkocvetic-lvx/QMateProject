// pageobjects/HomePage.js
class HomePage {
   

    async openApp() {
        await browser.url('https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html?sap-ui-theme=sap_horizon');
        
    }

    async addFirstItem() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.Button",
                bindingContextPath: "/Promoted/0"
            }
        });
    }

    async openCart() {
        await ui5.userInteraction.click({
            elementProperties: {
                viewName: "sap.ui.demo.cart.view.Welcome",
                metadata: "sap.m.ToggleButton"
            }
        });
        
    }
}
export default new HomePage();