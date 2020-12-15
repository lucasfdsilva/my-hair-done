import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.asystec-restaurant.co.uk'
  //baseURL: 'http://localhost:3000'
});

export default api;