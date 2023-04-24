const router = require('express').Router();

const validation = require('../middlewares/validation');
const isAuth = require('../middlewares/isAuthrized')
const { registerValidation, signinValidation } = require('../validation/auth');
const { register, signIn, getData } = require('../controllers/auth')

router.post('/register', validation(registerValidation), register)

router.post('/sign-in', validation(signinValidation), signIn)

router.get('/info',isAuth(), getData)


module.exports = router;