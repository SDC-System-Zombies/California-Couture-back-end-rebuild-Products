const pool = require('./index.js');

const fetchAllProducts = () => {
  const queryStr = 'SELECT * FROM products LIMIT 5';
  return pool.query(queryStr)
  .then((data) => data.rows);
};

const fetchOneProduct = (params) => {
  const getProductQuery = 'SELECT * FROM products WHERE id = $1';
  const getFeatureQuery = 'SELECT feature, value FROM features WHERE product_id = $1';

  return Promise.all([
    pool.query(getProductQuery, [params]),
    pool.query(getFeatureQuery, [params])
  ])
  .then((data) => {
    const productData = data[0].rows[0];
    const featureData = data[1].rows;

    return { ...productData, features: featureData };
  });
};

const fetchStyles = (params) => {
  const queryStr = 'SELECT style_id, name, sale_price, original_price, "default?" FROM styles WHERE product_id = $1';
  return pool.query(queryStr, [params])
  .then((data) => {
    const stylesData = data.rows;

    const skuData = stylesData.map((style) => {
      const id = style.style_id;
      return fetchSkus(id)
      .then((data) => {
        const skus = {};
        data.forEach(({ id, size, quantity }) => skus[id] = { size, quantity });
        return skus;
      });
    });

    return Promise.all(skuData)
    .then((dataSKU) => stylesData.map((style, index) => {
        return { ...style, skus: dataSKU[index] };
      }));
  });
};

const fetchSkus = (params) => {
  const queryStr = 'SELECT id, size, quantity FROM skus WHERE style_id = $1';
  return pool.query(queryStr, [params])
  .then((data) => data.rows);
};

const fetchRelated = (params) => {
  const queryStr = 'SELECT related_id FROM related WHERE product_id = $1';
  return pool.query(queryStr, [params])
  .then((data) => data.rows.map((related) => related.related_id));
};

module.exports = {
  fetchAllProducts,
  fetchOneProduct,
  fetchStyles,
  fetchRelated
};