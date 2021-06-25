const { fetchAllProducts, fetchProduct, fetchStyles, fetchSkus, fetchRelated } = require('../db/queries.js');

const getAllProducts = (req, res) => {
  fetchAllProducts()
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(`Error fetching products: ${err}`));
};

const getOneProduct

module.exports = {
  getAllProducts
};