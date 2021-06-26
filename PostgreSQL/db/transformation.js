const pool = require('./index.js');
const { fetchPhotos, fetchSkus } = require('./queries.js');


const transformingStyles = (id) => {
  return Promise.all([
    fetchPhotos(id),
    fetchSkus(id)
  ])
    .then((data) => {
      console.log('cheese', id);
      const photoData = data[0];
      const skuData = data[1];
      const queryStr = 'UPDATE styles SET photos = $1, skus = $2 WHERE style_id = $3;'
      return pool.query(queryStr, [photoData, skuData, id]);
    });
};

const start = () => {
  // const transformationPromises = [];
  // for(let i = 1; i <= 50; i++) {
  //   transformationPromises.push(transformingStyles(i));
  // }

  // return Promise.all(transformationPromises)
  //  .then((res) => console.log(`Hooray! Response: ${res}`))
  //  .catch((err) => console.log(`Error transforming Styles: ${err}`));

  for(let i = 1; i <= 50; i++) {
    transformingStyles(i);
      .then((res) => console.log(`Hooray! Response: ${res}`))
      .catch((err) => console.log(`Error transforming Styles: ${err}`));
  }
};

// 4660354 rows

// start();

/*
const photoItems = data[0].photos;
const updatedPhotos = photoItems.map((photo) => JSON.parse(photo));
res.send(updatedPhotos);
*/