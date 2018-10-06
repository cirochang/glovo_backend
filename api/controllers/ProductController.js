const moneeda = require('../gateways/moneeda');

function findProdInEx(product, exchange) {
  return exchange.find(productEx => productEx.id === product.id);
}

exports.show_all = async (req, res) => {
  try {
    const [responseBNB, responseBTX, responseBFX] = await Promise.all([
      moneeda.getProducts('BNB'),
      moneeda.getProducts('BTX'),
      moneeda.getProducts('BFX'),
    ]);
    const productsCommon = responseBNB.data.filter(productBNB =>
      findProdInEx(productBNB, responseBTX.data) &&
      findProdInEx(productBNB, responseBFX.data));
    return res.json(productsCommon);
  } catch (e) {
    return console.error(e);
  }
};

exports.show_prices = async (req, res) => {
  try {
    const [responseBNB, responseBTX, responseBFX] = await Promise.all([
      moneeda.getPrices('BNB', req.params.productName),
      moneeda.getPrices('BTX', req.params.productName),
      moneeda.getPrices('BFX', req.params.productName),
    ]);
    const BNB = (responseBNB.status === 200) ? responseBNB.data : null;
    const BTX = (responseBTX.status === 200) ? responseBTX.data : null;
    const BFX = (responseBFX.status === 200) ? responseBFX.data : null;
    const productPrices = { BNB, BTX, BFX };
    return res.json(productPrices);
  } catch (e) {
    return console.error(e);
  }
};
