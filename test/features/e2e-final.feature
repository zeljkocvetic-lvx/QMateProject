Feature: Complete end-to-end flow with filtered and searched products

    As a QA Automation Engineer
    I want to validate that users can browse, filter, search and add multiple products to the cart
    So that I can ensure the full end-to-end shopping experience works correctly for various categories

    Scenario Outline: Add filtered and searched products to cart and verify cart content
        Given Open the app
        When Select category "<category_name>"
        And Filter products by availability
        And Add first filtered product to cart
        And Navigate back to the category page
        And Search product "<searched_product>" and add <searched_quantity> items to cart
        And Navigate to the cart
        Then Verify cart contains exactly the products added with correct name, quantity and price

        Examples:
            | category_name | searched_product | searched_quantity |
            | Mice          | Pocket Mouse     | 2                 |
            | Keyboards     | Media Keyboard   | 1                 |
            | Speakers      | Surround Sound   | 3                 |