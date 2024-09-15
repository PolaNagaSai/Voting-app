// src/apiService.js
import axios from 'axios';

// Set up your API endpoint
const API_URL = "http://localhost:3000"; // Replace with your backend URL


export const signUp = async (userData) => {
  try {
    // Make POST request with user credentials
    console.log('Sending userData:', userData);
    const response = await axios.post(`${API_URL}/user/signup`, userData, {
      headers: {
        'Content-Type': 'application/json', // Ensure this header is set
      },
    });
    return response.data; // Return the response data from the server
  }  catch (error) {
    // Log detailed error information
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error during signup request:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error during signup request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error during signup request:', error.message);
    }
    
    // Optionally, rethrow the error if you need to handle it further up
    throw error;
  }
};


export const login = async (credentials) => {
  try {
    // Make POST request with user credentials
    const response = await axios.post(`${API_URL}/user/login`, credentials, {
      headers: {
        'Content-Type': 'application/json', // Ensure this header is set
      },
    });
    console.log(response.data);
    return response.data; // Return the response data from the server
  } catch (error) {
    // Log the error and rethrow it
    console.error('Error during login request:', error.response || error.message);
    throw error;
  }
};
