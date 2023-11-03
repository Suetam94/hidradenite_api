const { Router } = require('express')
const upload = require('../middlewares/importFile')
const createController = require('../controllers/gallery/create')

const galleryRoutes = Router()

galleryRoutes.post('/', upload.array('media', 10), createController.handle)

module.exports = galleryRoutes
