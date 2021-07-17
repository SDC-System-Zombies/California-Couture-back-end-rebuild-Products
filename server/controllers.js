const { fetchAllProducts, fetchOneProduct, fetchStyles, fetchRelated } = require('../db/queries.js');

const getAllProducts = (req, res) => {
  fetchAllProducts()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send(`Error fetching products: ${err}`)
      console.error(`Error fetching products: ${err}\n\n${err.stack}`);
    });
};

const getOneProduct = (req, res) => {
  const id = req.params.product_id;
  fetchOneProduct(id)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send(`Error fetching single product: ${err}`)
      console.error(`Error fetching single product: ${err}\n\n${err.stack}`);
    });
};

const getStyles = (req, res) => {
  const id = req.params.product_id;
  fetchStyles(id)
    .then((data) => {
      data.forEach((item) => {
        if (item.sale_price === "null") {
          item.sale_price = null;
        }
      });

      res.status(200).send({ product_id: id, results: data })
    })
    .catch((err) => {
      res.status(500).send(`Error fetching styles: ${err}`)
      console.error(`Error fetching styles: ${err}\n\n${err.stack}`);
    });
};

const getRelated = (req, res) => {
  const id = req.params.product_id;
  fetchRelated(id)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send(`Error related products: ${err}`)
      console.error(`Error related products: ${err}\n\n${err.stack}`);
    });
}

module.exports = {
  getAllProducts,
  getOneProduct,
  getStyles,
  getRelated
};