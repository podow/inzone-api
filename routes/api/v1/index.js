const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/categories', require('./categories'));
router.use('/stocks', require('./stocks'));
router.use('/places', require('./places'));

module.exports = router;
