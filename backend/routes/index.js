const router = require('express').Router();

const routeSignup = require('./signup.js');
const routeSignin = require('./signin.js');
S
const auth = require('../middlewares/auth.js');

const routeUsers = require('./users.js');
const routeCards = require('./cards.js');

const NotFoundError = require('../errors/NotFoundError.js');

router.use('/', routeSignup);
router.use('/', routeSignin);

router.use(auth);

router.use('/users', routeUsers);
router.use('/cards', routeCards);

router.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

module.exports = router;
