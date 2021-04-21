import axios from 'axios';

var backendURL = 'https://api.myhairdone.co.uk/';

if(process.env.NODE_ENV !== 'production'){
  backendURL = "http://localhost:3000"
}

const api = axios.create({
  baseURL: backendURL
});

export default api;