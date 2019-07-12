const router = require('express').Router();
const auth = require('../../../utils/auth');
const { Categories } = require('../../../models');

// Get all
router.get('/', auth.optional, async (req, res) => {
  const allCategories = await Categories.findAndCountAll({
    where: { published: true }
  });

  if (allCategories.count === 0) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: allCategories
  });
});

// Get one by id
router.get('/:id', auth.optional, async (req, res) => {
  const { params: { id } } = req;
  const category = await Categories.findByPk(id);

  if (!category) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: category
  });
});

// Create
router.post('/', auth.required, async (req, res) => {
  const { body: data } = req;
  const category = await Categories.findOne({ where: { name: data.name } });

  if (category) {
    return res.status(409).send({
      isSuccess: false,
      err: 'This category is already exist',
      exist: category
    });
  }

  const newCategory = await Categories.create(data);

  return res.status(201).send({
    isSuccess: true,
    data: newCategory
  });
});

// Update
router.put('/:id', auth.required, async (req, res) => {
  const { params: { id }, body } = req;
  const category = await Categories.findByPk(id);

  category.update(body);

  return res.status(200).send({
    isSuccess: true,
    msg: 'Updated successful',
    data: category
  });
});

// Delete
router.delete('/:id', auth.required, async (req, res) => {
  const { params: { id } } = req;
  const category = await Categories.findByPk(id);

  category.update({ isDeleted: true });

  // Full delete
  // await Categories.destroy({ where: { id } });

  return res.status(204).send({
    isSuccess: true,
    msg: 'Deleted successful',
    data: category
  });
});

module.exports = router;
