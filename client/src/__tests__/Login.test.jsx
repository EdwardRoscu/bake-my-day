import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Login from '../scenes/auth/Login';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock axios POST request
jest.mock('axios');

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Login component', () => {
  test('submits the form successfully', async () => {

    const mockResponse = {
      data: {
        jwt: 'mockJwtToken',
        user: {
          id: 'mockUserId',
          isAdmin: false
        }
      }
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    
    const { getByLabelText, getByTestId } = render(
      <Router>
        <Login />
      </Router>
    );
    // Fill in form fields
    fireEvent.change(getByLabelText(/email or username/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(getByTestId('login-button'));

    // Wait for the form submission to be completed
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Check local storage values
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(3);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('jwt', 'mockJwtToken');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ id: 'mockUserId', isAdmin: false })
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith('userId', 'mockUserId');

    // Check if the correct navigation has occurred
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // Reset mock functions
    axios.post.mockReset();
    useNavigate.mockReset();
    localStorageMock.setItem.mockReset();
  });

  test('displays an error message on form submission failure', async () => {
    const errorMessage = 'Invalid credentials';
    const errorResponse = {
      response: {
        data: {
          error: {
            message: errorMessage
          }
        }
      }
    };
    axios.post.mockRejectedValueOnce(errorResponse);

    const { getByLabelText, getByTestId, queryByText } = render(
      <Router>
        <Login />
      </Router>
    );

    // Fill in form fields
    fireEvent.change(getByLabelText(/email or username/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(getByTestId('login-button'));

    // Wait for the form submission to be completed
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Check if the error message is displayed
    expect(queryByText(errorMessage)).toBeInTheDocument();

    // Reset mock functions
    axios.post.mockReset();
    useNavigate.mockReset();
  });
});
