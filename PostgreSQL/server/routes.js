const controller = require('./controllers');
const router = require('express').Router();

router.get('/messages', controller.messages.get);

router.post('/messages', controller.messages.post);

router.get('/users', controller.users.get);

router.post('/users', controller.users.post);

module.exports = router;