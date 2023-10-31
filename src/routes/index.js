const { Router } = require('express')

const router = Router()

router.use('/articles', require('./articles'))

module.exports = router
