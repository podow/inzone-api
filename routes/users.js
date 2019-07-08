const express = require('express');
const router = express.Router();
const User = require('../models').User;

router.post('/create', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.send({
      isSuccess: !!newUser,
      newUser
    });
  } catch (err) {
    res.send({
      isSuccess: !err,
      err
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

    res.send({
      isSuccess: !!users,
      users
    });
  } catch (err) {
    res.send({
      isSuccess: !err,
      err
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    res.send({
      isSuccess: !!user,
      user
    });
  } catch (err) {
    res.send({
      isSuccess: !err,
      err
    });
  }
});

module.exports = router;
