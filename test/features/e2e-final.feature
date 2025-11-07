Feature: End-to-end checkout

    Scenario: Complete end-to-end checkout flow
        Given I open the app
        When I add the first promoted item to the cart and proceed to checkout
        And I go to the payment step
        And I fill credit card details with holder "John Doe", number "4111111111111111", CVV "123" and expiration "12/2026"
        And I fill delivery address with "Main St", "Anytown", "12345", "USA"
        And I submit the order
        Then I should see the order submitted successfully