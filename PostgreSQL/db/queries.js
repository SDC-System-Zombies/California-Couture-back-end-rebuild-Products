const pool = require('./index.js');

const fetchAllProducts = () => {
  const queryStr = 'SELECT * FROM products LIMIT 5';
  return pool.query(queryStr)
  .then((data) => data.rows);
};

const fetchOneProduct = (params) => {
  const getProductQuery = 'SELECT * FROM products WHERE productId = $1';
  const getFeatureQuery = 'SELECT feature, value FROM features WHERE productId = $1';

  return Promise.all([
    pool.query(getProductQuery, params),
    pool.query(getFeatureQuery, params)
  ])
  .then((data) => {
    const productData = data[0].rows[0];
    const featureData = data[1].rows;

    return { ...productData, features: featureData };
  });
};

const fetchStyles = (params) => {
  const queryStr = 'SELECT styleId, name, sale_price, original_price, default_style FROM styles WHERE productId = $1';
  return pool.query(queryStr, params)
  .then((data) => {
    const stylesData = data.rows;

    const skuData = stylesData.map((style) => {
      const id = [ style.styleid ];
      return fetchSkus(id)
      .then((data) => {
        return data.map((sku) => {
          const specificSku = {};
          specificSku[sku.id] = {
            size: sku.size,
            quantity: sku.quantity
          };

          return specificSku;
        });
      });
    });

    return Promise.all(skuData)
    .then((dataSKU) => {
      return stylesData.map((style, index) => {
        return { ...style, skus: dataSKU[index] };
      });
    });
  });
};

const fetchSkus = (params) => {
  const queryStr = 'SELECT id, size, quantity FROM skus WHERE styleId = $1';
  return pool.query(queryStr, params)
  .then((data) => data.rows);
};

const fetchRelated = (params) => {
  const queryStr = 'SELECT relatedId FROM related WHERE productId = $1';
  return pool.query(queryStr, params)
  .then((data) => data.rows.map((related) => related.relatedid));
};

module.exports = {
  fetchAllProducts,
  fetchOneProduct,
  fetchStyles,
  fetchRelated
};