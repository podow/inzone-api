const router = require('express').Router();
const auth = require('../../../utils/auth');
const { Stocks } = require('../../../models');

// Get all
router.get('/', auth.optional, async (req, res) => {
  const allStocks = await Stocks.findAndCountAll({
    where: { published: true }
  });

  if (allStocks.count === 0) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: allStocks
  });
});

// Get one by id
router.get('/:id', auth.optional, async (req, res) => {
  const { params: { id } } = req;
  const stock = await Stocks.findByPk(id);

  if (!stock) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: stock
  });
});

// Create
router.post('/', auth.required, async (req, res) => {
  const { body: data } = req;
  const stock = await Stocks.findOne({ where: { title: data.title } });

  if (stock) {
    return res.status(409).send({
      isSuccess: false,
      err: 'This stock is already exist',
      exist: stock
    });
  }

  const newStock = await Stocks.create(data);

  return res.status(201).send({
    isSuccess: true,
    data: newStock
  });
});

// Update
router.put('/:id', auth.required, async (req, res) => {
  const { params: { id }, body } = req;
  const stock = await Stocks.findByPk(id);

  stock.update(body);

  return res.status(200).send({
    isSuccess: true,
    msg: 'Updated successful',
    data: stock
  });
});

// Delete
router.delete('/:id', auth.required, async (req, res) => {
  const { params: { id } } = req;
  const stock = await Stocks.findByPk(id);

  stock.update({ isDeleted: true });

  // Full delete
  // await Categories.destroy({ where: { id } });

  return res.status(204).send({
    isSuccess: true,
    msg: 'Deleted successful',
    data: stock
  });
});

module.exports = router;
