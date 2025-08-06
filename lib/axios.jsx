// src/api/axios.js

import axios from 'axios';

// Create an Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


