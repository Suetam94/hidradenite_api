const { Router } = require('express')

const router = Router()

router.use('/articles', require('./articles'))
router.use('/gallery', require('./gallery'))

module.exports = router
