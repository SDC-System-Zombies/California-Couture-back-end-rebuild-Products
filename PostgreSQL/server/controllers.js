const { fetchAllProducts, fetchProduct, fetchStyles, fetchSkus, fetchRelated } = require('../db/queries.js');

const getAllProducts = (req, res) => {
  new Promise ((res, rej) => {
    fetchAllProducts((data, err) => {
      err ? rej(err) : res(data);
    });
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(400).second(`Error fetching products: ${err}`));
};

module.exports = {
  getAllProducts
};