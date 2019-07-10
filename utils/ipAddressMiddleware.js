const User = require('../models').User;

module.exports = async (req, res, next) => {
  const { payload: { id } } = req;
  const { ip: ipAddress } = req;

  const user = await User.findByPk(id);

  user.update({
    ipAddress
  });

  next();
};
