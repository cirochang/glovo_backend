const moneeda = require('../gateways/moneeda');

function findProdInEx(product, exchange) {
  return exchange.find(productEx => productEx.id === product.id);
}

exports.show_all = async (req, res) => {
  const [responseBNB, responseBTX, responseBFX] = await Promise.all([
    moneeda.getProducts('BNB'),
    moneeda.getProducts('BTX'),
    moneeda.getProducts('BFX'),
  ]);
  const productsCommon = responseBNB.data.filter(productBNB =>
    findProdInEx(productBNB, responseBTX.data) &&
    findProdInEx(productBNB, responseBFX.data));
  return res.json(productsCommon);
};

exports.show_prices = async (req, res) => {
  const [responseBNB, responseBTX, responseBFX] = await Promise.all([
    moneeda.getPrices('BNB', req.params.productName),
    moneeda.getPrices('BTX', req.params.productName),
    moneeda.getPrices('BFX', req.params.productName),
  ]);
  const productPrices = [
    {
      exchange: 'BNB',
      price: responseBNB.data.price,
    },
    {
      exchange: 'BTX',
      price: responseBTX.data.price,
    },
    {
      exchange: 'BFX',
      price: responseBFX.data.price,
    },
  ];
  return res.json(productPrices);
};
