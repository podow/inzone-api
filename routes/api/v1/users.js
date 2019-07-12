const passport = require('passport');
const router = require('express').Router();
const nodeMailer = require('nodemailer');
const auth = require('../../../utils/auth');
const { Users } = require('../../../models');
const ipAddressMiddleware = require('../../../utils/ipAddressMiddleware');

router.post('/register', [auth.optional, ipAddressMiddleware], (req, res,) => {
  const { body: user } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.hash) {
    return res.status(422).json({
      errors: {
        hash: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.hash = user.hash;

  return finalUser.save()
    .then(() => res.send({ user: finalUser.toAuthJSON() }))
    .catch(err => res.send({ err }));
});

router.post('/login', [auth.optional, ipAddressMiddleware], (req, res, next) => {
  const { body: user } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.hash) {
    return res.status(422).json({
      errors: {
        hash: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.status(400).send({
      ...info
    });
  })(req, res, next);
});

router.get('/current', auth.required, (req, res) => {
  const { payload: { id } } = req;

  return Users.findByPk(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

// TODO: Replace params with .env
// TODO: move to utils
router.post('/forgot-password', auth.optional, function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: 'hello@gmail.com',
      pass: 'test'
    }
  });

  let mailOptions = {
    // should be replaced with real recipient's account
    to: 'info@gmail.com',
    subject: req.body.subject,
    body: req.body.message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  res.writeHead(301, { Location: 'index.html' });
  res.end();
});

module.exports = router;
