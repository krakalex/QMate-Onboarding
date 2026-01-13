Feature: Order Management

Scenario: Verify the stock is updated after placing an order
    Given Open the Demokit application
    When Check the stock of the product "Chai"
    And Place an order for the selected product
    Then Verify that the stock quantity increased by 10