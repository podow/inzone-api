const express = require('express');
const router = express.Router();
const version = require('../package').version[0];

router.get('/version', function (req, res) {
  res.status(200).send({
    version: version
  });
});

router.use('/api', require('./api'));

module.exports = router;
