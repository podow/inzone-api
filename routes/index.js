const express = require('express');
const router = express.Router();
const version = require('../package').version[0];

/* GET home page. */
router.get('/', function (req, res) {
  res.status(200).send({
    test: 'OK'
  });
});

router.get('/version', function (req, res) {
  res.status(200).send({
    version: version
  });
});

module.exports = router;
