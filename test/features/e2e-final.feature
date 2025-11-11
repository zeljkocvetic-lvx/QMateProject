Feature: Complete end-to-end flow with filtered and searched products

    Scenario Outline: Add filtered and searched products to cart and proceed to checkout
        Given the app is opened
        When I select category "<category_name>"
        And I filter products by availability
        And I add the first filtered product to the cart
        And I navigate back to the category page
        And I search product "<searched_product>" and add "<quantity>" items to the cart
        And I search product "Pocket Mouse" and add "2" items to the cart
        Then the cart should contain exactly 2 products with correct name, quantity and price
        And I proceed to checkout

        Examples:
            | category_name | searched_product | quantity |
            | Mice          | Pocket Mouse     | 2        |
# When I add the first promoted item to the cart and proceed to checkout
# And I go to the payment step
# And I fill credit card details with holder "John Doe", number "4111111111111111", CVV "123" and expiration "12/2026"
# And I fill delivery address with "Main St", "Anytown", "12345", "USA"
# And I submit the order
# Then I should see the order submitted successfully