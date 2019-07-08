var express = require('express');
var router = express.Router();
const User = require('../models').User;

/* GET users listing. */
router.get('/', async (req, res) => {
  res.send({
    users: await User.findAll()
  });
});

router.get('/:id', async (req, res) => {
    res.send({
        user: await User.findByPk(req.params.id)
    });
});

router.get('/create', async (req, res) => {
  res.send({
    newUser: await User.create({ firstName: 'Test', lastName: "test", email: "test@mail.com" })
  });
});

module.exports = router;
