const { getAllProducts } = require('./controllers');
const router = require('express').Router();

router.get('/products', getAllProducts);

// router.get('/products/:product_id', controller);

// router.get('/products/:product_id/styles', controller);

// router.get('/products/:product_id/related', controller);

module.exports = router;