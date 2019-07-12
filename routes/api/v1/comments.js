const router = require('express').Router();
const auth = require('../../../utils/auth');
const { Comments } = require('../../../models');

// Get all
router.get('/', auth.optional, async (req, res) => {
  const allComments = await Comments.findAndCountAll({
    where: { published: true }
  });

  if (allComments.count === 0) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: Comments
  });
});

// Get one by id
router.get('/:id', auth.optional, async (req, res) => {
  const { params: { id } } = req;
  const comment = await Comments.findByPk(id);

  if (!comment) {
    return res.status(404).send({
      isSuccess: false,
      err: '404 - Not found'
    });
  }

  return res.status(200).send({
    isSuccess: true,
    data: comment
  });
});

// Create
router.post('/', auth.required, async (req, res) => {
  const { body: data, payload: { id } } = req;
  const newComment = await Comments.create({
    authorId: data.authorId || id,
    ...data
  });

  return res.status(201).send({
    isSuccess: true,
    data: newComment
  });
});

// Update
router.put('/:id', auth.required, async (req, res) => {
  const { params: { id }, body } = req;
  const comment = await Comments.findByPk(id);

  comment.update(body);

  return res.status(200).send({
    isSuccess: true,
    msg: 'Updated successful',
    data: comment
  });
});

// Delete
router.delete('/:id', auth.required, async (req, res) => {
  const { params: { id } } = req;
  const comment = await Comments.findByPk(id);

  comment.update({ isDeleted: true });

  // Full delete
  // await Comments.destroy({ where: { id } });

  return res.status(204).send({
    isSuccess: true,
    msg: 'Deleted successful',
    data: comment
  });
});

module.exports = router;
