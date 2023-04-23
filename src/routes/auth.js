const router = require('express').Router();

const validation = require('../middlewares/validation');
const { registerValidation, signinValidation } = require('../validation/auth');
const { register, signIn, deleteAcc } = require('../controllers/auth')

router.post('/register', validation(registerValidation), register)

router.post('/sign-in', validation(signinValidation), signIn)


module.exports = router;