Feature: End-to-end checkout

    Scenario: Complete end-to-end checkout flow
        Given I open the app
        When I add the first promoted item to the cart and proceed to checkout
        And I complete the checkout with test card and delivery details
        Then I should see the order submitted successfully