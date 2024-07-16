import axios from 'axios';

const apiGeneral = axios.create({
  baseURL: 'https://www.omdbapi.com/',
  params: {
    apikey: 'd8c16e35'
  }
});

export default apiGeneral;