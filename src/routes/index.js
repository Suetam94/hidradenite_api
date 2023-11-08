const { Router } = require('express')

const router = Router()

router.use('/articles', require('./articles'))
router.use('/gallery', require('./gallery'))
router.use('/components', require('./components'))
router.use('/components-text', require('./componentsText'))

module.exports = router
