import Axios from 'axios';

export const endpoint = 'https://api.iextrading.com/1.0';

export const symbols = () => Axios.get(`${endpoint}/ref-data/symbols`);

export const company = symbol => Axios.get(`${endpoint}/stock/${symbol}/company`);

export const logo = symbol => Axios.get(`${endpoint}/stock/${symbol}/logo`);