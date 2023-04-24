const router = require('express').Router();

const validation = require('../middlewares/validation');
const isAuth = require('../middlewares/isAuthrized')
const { registerValidation, signinValidation, passValidation, updateValidation } = require('../validation/auth');
const { register, signIn, getData, update, updatePass } = require('../controllers/auth')

router.post('/register', validation(registerValidation), register)

router.post('/sign-in', validation(signinValidation), signIn)

router.get('/info', isAuth(), getData)

router.put('/update-info', isAuth(), validation(updateValidation), update)
router.patch('/update-pass', isAuth(), validation(passValidation), updatePass)


module.exports = router;