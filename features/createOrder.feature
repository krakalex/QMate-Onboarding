Feature: Order Management

Scenario: Verify the stock is updated after placing an order
    Given I open the Demokit application
    When I check the "initial stock" of the first product
    And I place an order for the selected product
    Then I should see that the stock was updated correctly