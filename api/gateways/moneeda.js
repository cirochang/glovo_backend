const axios = require('axios');

const MONEEDA_API = () =>
  axios.create({
    baseURL: process.env.MONEEDA_API_URI,
    headers: {
      Authorization: `Bearer ${process.env.MONEEDA_API_AUTH}`,
    },
  });

exports.getProducts = exchangeName =>
  MONEEDA_API().get(`/api/exchanges/${exchangeName}/products`);

exports.getPrices = (exchangeName, productName) =>
  MONEEDA_API().get(`/api/exchanges/${exchangeName}/ticker?product=${productName}`, {
    validateStatus: status => status <= 400,
  });
