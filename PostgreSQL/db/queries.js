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

      const skus = Promise.all(stylesData.map(({ style_id }) => fetchSkus(style_id)));
      const photos = Promise.all(stylesData.map(({ style_id }) => fetchPhotos(style_id)));

      return Promise.all([skus, photos])
        .then((data) => {
          const mergedStyles = stylesData.map((style, i) => {
            return { ...style,
              photos: data[1][i],
              skus: data[0][i]
            };
          });

          return mergedStyles;
        });
    });
};

/*
const photoItems = data[0].photos;
const updatedPhotos = photoItems.map((photo) => JSON.parse(photo));
res.send(updatedPhotos);
*/

const fetchSkus = (params) => {
  const queryStr = 'SELECT id, size, quantity FROM skus WHERE style_id = $1';
  return pool.query(queryStr, [params])
    .then((data) => {
      const sku = {};
      data.rows.forEach(({ id, size, quantity }) => sku[id] = { size, quantity });
      return sku;
    });
};

const fetchPhotos = (params) => {
  const queryStr = 'SELECT url, thumbnail_url FROM photos WHERE style_id = $1';
  return pool.query(queryStr, [params])
    .then((data) => data.rows);
};

const fetchRelated = (params) => {
  const queryStr = 'SELECT related_id FROM related WHERE product_id = $1';
  return pool.query(queryStr, [params])
    .then((data) => data.rows.map(({ related_id }) => related_id));
};


const transformingStyles = (id) => {
  return Promise.all([
    fetchPhotos(id),
    fetchSkus(id)
  ])
    .then((data) => {
      const photoData = data[0];
      const skuData = data[1];

      console.log('photos', photoData);
      console.log('skuData', skuData);

      const queryStr = 'UPDATE styles_test SET photos = $1, skus = $2 WHERE style_id = $3;'
      return pool.query(queryStr, [photoData, skuData, id]);
    })
};

// transformingStyles(2)
//   .then((res) => console.log(`Hooray! Response: ${res}`))
//   .catch((err) => console.log(`Error with promise all for transforming Styles: ${err}`));


module.exports = {
  fetchAllProducts,
  fetchOneProduct,
  fetchStyles,
  fetchRelated
};