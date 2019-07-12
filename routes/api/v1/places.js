const router = require('express').Router();
const auth = require('../../../utils/auth');
const { Places } = require('../../../models');

// Get all
router.get('/', auth.optional, async (req, res) => {
  const allPlaces = await Places.findAndCountAll({
    where: { published: true }
  });

  if (allPlaces.count === 0) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: allPlaces
  });
});

// Get one by id
router.get('/:id', auth.optional, async (req, res) => {
  const { params: { id } } = req;
  const place = await Places.findByPk(id);

  if (!place) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: place
  });
});

// Create
router.post('/', auth.required, async (req, res) => {
  const { body: data } = req;
  const place = await Places.findOne({ where: { name: data.name } });

  if (place) {
    return res.status(409).send({
      isSuccess: false,
      err: 'This category is already exist',
      exist: place
    });
  }

  const newPlace = await Places.create(data);

  return res.status(201).send({
    isSuccess: true,
    data: newPlace
  });
});

// Update
router.put('/:id', auth.required, async (req, res) => {
  const { params: { id }, body } = req;
  const place = await Places.findByPk(id);

  place.update(body);

  return res.status(200).send({
    isSuccess: true,
    msg: 'Updated successful',
    data: place
  });
});

// Delete
router.delete('/:id', auth.required, async (req, res) => {
  const { params: { id } } = req;
  const place = await Places.findByPk(id);

  place.update({ isDeleted: true });

  // Full delete
  // await Places.destroy({ where: { id } });

  return res.status(204).send({
    isSuccess: true,
    msg: 'Deleted successful',
    data: place
  });
});

module.exports = router;
