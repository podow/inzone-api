const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { payload: { id } } = req;
  const { ip: ipAddress } = req;

  const user = await Users.findByPk(id);

  user.update({
    ipAddress
  });

  next();
};
