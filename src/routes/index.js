const { Router } = require('express')

const router = Router()

router.use('/articles', require('./articles'))
router.use('/gallery', require('./gallery'))
router.use('/components', require('./components'))

module.exports = router
