var express = require('express');
var router = express.Router();
const models = require('../models');
const User = models.User;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send({
    users: await User.findAll()
  });
});

module.exports = router;
