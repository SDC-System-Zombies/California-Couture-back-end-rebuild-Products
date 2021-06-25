const { getAllProducts, getOneProduct, getStyles } = require('./controllers');
const router = require('express').Router();

router.get('/', getAllProducts);

router.get('/:product_id', getOneProduct);

router.get('/:product_id/styles', getStyles);

// router.get('/:product_id/related', controller);

module.exports = router;