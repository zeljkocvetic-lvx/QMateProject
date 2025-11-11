Feature: Complete end-to-end flow with filtered and searched products

    Scenario Outline: Add filtered and searched products to cart and verify cart content
        Given Open the app
        When Select category "<category_name>"
        And Filter products by availability
        And Add first filtered product to cart
        And Navigate back to the category page
        And Search product "<searched_product>" and add "<searched_quantity>" items to cart
        And Navigate to the cart
        Then Verify cart contains exactly 2 products with correct name, quantity and price

        Examples:
            | category_name | searched_product | searched_quantity |
            | Mice          | Pocket Mouse     | 2                 |