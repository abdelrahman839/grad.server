const router = require('express').Router();



router.get('/', function (req, res) {
    res.json({ message: "welcome to Fly" })

})

const authRoutes = require('./auth')

router.use('/', authRoutes)

module.exports = router;