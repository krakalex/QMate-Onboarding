Feature: Order Management

Scenario: Verify the stock is updated after placing an order
    Given Open the Demokit application
    When Get "Chai" quantity in stock 
    And Place an order for the selected product
    Then Verify that "Chai" stock quantity increased by 10