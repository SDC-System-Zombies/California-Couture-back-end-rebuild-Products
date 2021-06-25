const pool = require('./index.js');

const fetchAllProducts = () => {
  const queryStr = 'SELECT * FROM products LIMIT 5';
  return pool.query(queryStr)
  .then((data) => data.rows);
};

const fetchOneProduct = (params) => {
  const getProductQuery = 'SELECT * FROM products WHERE productId = $1';
  const getFeatureQuery = 'SELECT feature, value FROM features WHERE productId = $1';

  Promise.all([
    pool.query(getProductQuery, params),
    pool.query(getFeatureQuery, params)
  ])
  .then((data) => data)
  .catch((err) => `Query fetching product failed: ${err}`);
};

const fetchStyles = (params) => {
  const queryStr = 'SELECT styleId, name, sale_price, original_price, default_style FROM styles WHERE productId = $1';
  pool.query(queryStr, params)
  .then((data) => data)
  .catch((err) => `Query fetching styles failed: ${err}`);
};

const fetchSkus = (params) => {
  const queryStr = 'SELECT size, quantity FROM styles WHERE styleId = $1';
  pool.query(queryStr, params)
  .then((data) => data)
  .catch((err) => `Query fetching skus failed: ${err}`);
};

const fetchRelated = (params) => {
  const queryStr = 'SELECT relatedId FROM related WHERE productId = $1';
  pool.query(queryStr, params)
  .then((data) => data)
  .catch((err) => `Query fetching related products failed: ${err}`);
};

module.exports = {
  fetchAllProducts,
  fetchProduct,
  fetchStyles,
  fetchSkus,
  fetchRelated
};