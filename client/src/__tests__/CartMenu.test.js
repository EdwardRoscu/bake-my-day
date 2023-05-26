import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import CartMenu from "../scenes/global/CartMenu";
import { setIsCartOpen } from "../state";
import '@testing-library/jest-dom/extend-expect'; // Import the library

// Create a mock Redux store
const mockStore = configureStore([]);

describe("CartMenu", () => {
  let store;

  beforeEach(() => {
    // Initialize the mock store with initial state
    store = mockStore({
      cart: {
        cart: [
          {
            id: 1,
            attributes: {
              name: "Product 1",
              price: 10,
              image: {
                data: {
                  attributes: {
                    formats: {
                      medium: {
                        url: "/path/to/image.jpg",
                      },
                    },
                  },
                },
              },
            },
            count: 1,
          },
        ],
        isCartOpen: true,
      },
    });

    // Mock the dispatch function
    store.dispatch = jest.fn();
  });

  test("renders cart menu with items", () => {
    render(
        <Provider store={store}>
        <Router>
          <CartMenu />
        </Router>
      </Provider>
    );

    // Check if the cart menu is rendered
    const cartMenu = screen.getByTestId("cart-menu");
    expect(cartMenu).toBeInTheDocument();

    // Check if the item name is rendered
    const itemName = screen.getByText("Product 1");
    expect(itemName).toBeInTheDocument();

    // Check if the item price is rendered
    const itemPrice = screen.getByTestId("price-id");
    expect(itemPrice).toBeInTheDocument();
  });

  test("clicking close button dispatches setIsCartOpen action", () => {
    render(
        <Provider store={store}>
        <Router>
          <CartMenu />
        </Router>
      </Provider>
    );

    // Click the close button
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    // Check if the setIsCartOpen action was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(setIsCartOpen({}));
  });
});
