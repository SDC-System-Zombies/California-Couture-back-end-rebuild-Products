const { fetchAllProducts, fetchOneProduct, fetchStyles, fetchRelated } = require('../db/queries.js');

const getAllProducts = (req, res) => {
  fetchAllProducts()
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(`Error fetching products: ${err}`));
};

const getOneProduct = (req, res) => {
  const id = req.params.product_id;
  fetchOneProduct(id)
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(`Error fetching a product: ${err}`));
};

const getStyles = (req, res) => {
  const id = req.params.product_id;
  fetchStyles(id)
  .then((data) => {
    const styleInfo = {
      product_id: id,
      results: data
    };

    res.status(200).send(styleInfo)
  })
  .catch((err) => res.status(500).send(`Error fetching styles: ${err}`));
};

const getRelated = (req, res) => {
  const id = req.params.product_id;
  fetchRelated(id)
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(`Error fetching styles: ${err}`));
}

module.exports = {
  getAllProducts,
  getOneProduct,
  getStyles,
  getRelated
};