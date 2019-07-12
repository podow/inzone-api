const router = require('express').Router();
const auth = require('../../../utils/auth');
const { Cities } = require('../../../models');

// Get all
router.get('/', auth.optional, async (req, res) => {
  const allCities = await Cities.findAndCountAll({
    where: { published: true }
  });

  if (allCities.count === 0) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: allCities
  });
});

// Get one by id
router.get('/:id', auth.optional, async (req, res) => {
  const { params: { id } } = req;
  const city = await Cities.findByPk(id);

  if (!city) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: city
  });
});

// Create
router.post('/', auth.required, async (req, res) => {
  const { body: data } = req;
  const city = await Cities.findOne({ where: { name: data.name } });

  if (city) {
    return res.status(409).send({
      isSuccess: false,
      err: 'This city is already exist',
      exist: city
    });
  }

  const newCity = await Cities.create(data);

  return res.status(201).send({
    isSuccess: true,
    data: newCity
  });
});

// Update
router.put('/:id', auth.required, async (req, res) => {
  const { params: { id }, body } = req;
  const city = await Cities.findByPk(id);

  city.update(body);

  return res.status(200).send({
    isSuccess: true,
    msg: 'Updated successful',
    data: city
  });
});

// Delete
router.delete('/:id', auth.required, async (req, res) => {
  const { params: { id } } = req;
  const city = await Cities.findByPk(id);

  city.update({ isDeleted: true });

  // Full delete
  // await Cities.destroy({ where: { id } });

  return res.status(204).send({
    isSuccess: true,
    msg: 'Deleted successful',
    data: city
  });
});

module.exports = router;
