Feature: Complete end-to-end flow with filtered and searched products

    Scenario: Add filtered and searched products to cart and proceed to checkout
        Given the app is opened
        When I select category "Mice"
        And I add the first filtered product to the cart
        And I search product "Mouse Pad" and add "2" items to the cart
        Then the filtered product should be in the cart with correct quantity
        And the searched product should be in the cart with correct quantity
        Then I proceed to checkout
# When I add the first promoted item to the cart and proceed to checkout
# And I go to the payment step
# And I fill credit card details with holder "John Doe", number "4111111111111111", CVV "123" and expiration "12/2026"
# And I fill delivery address with "Main St", "Anytown", "12345", "USA"
# And I submit the order
# Then I should see the order submitted successfully