Feature: Complete end-to-end flow with filtered and searched products

    Scenario Outline: Add filtered and searched products to cart and proceed to checkout
        Given the app is opened
        When I select category "<category_name>"
        And I filter products by availability
        And I add the first filtered product to the cart
        And I navigate back to the category page
        And I search product "<searched_product>" and add "<searched_quantity>" items to the cart
        And I navigate to the cart
        Then the cart should contain exactly 2 products with correct name, quantity and price

        Examples:
            | category_name | searched_product | searched_quantity |
            | Mice          | Pocket Mouse     | 2                 |
