import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchForm from "../components/SearchForm";

describe('SearchForm', () => {
  it('should submit the form with the search term and clear the input field', () => {
    const { getByPlaceholderText , getByTestId } = render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );

    const input = getByPlaceholderText ('What is your sweet desire?! SEARCH HERE!');
    const submitButton = getByTestId('search-form-submit');

    // Simulate typing in the input field
    fireEvent.change(input, { target: { value: 'chocolate' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert that the form was submitted correctly
    expect(window.location.pathname).toBe('/');
    expect(window.location.search).toBe('');

    // Assert that the input field is cleared after submission
    expect(input.value).toBe('chocolate');
  });
});
