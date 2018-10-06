const { Router } = require('express');
const auth = require('../controllers/Auth');
const product = require('../controllers/ProductController');

module.exports = (app) => {
  const apiV1 = Router();
  app.use('/api/v1', apiV1);

  apiV1.route('/products')
    .get(auth.authorize, product.show_all);

  apiV1.route('/products/:productName/prices')
    .get(auth.authorize, product.show_prices);
};
