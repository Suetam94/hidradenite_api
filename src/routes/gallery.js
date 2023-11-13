const { Router } = require('express')
const upload = require('../middlewares/importFile')
const createController = require('../controllers/gallery/create')
const getController = require('../controllers/gallery/get')
const deleteController = require('../controllers/gallery/delete')

const galleryRoutes = Router()

galleryRoutes.post('/', upload.array('media', 10), createController.handle)
galleryRoutes.get('/', getController.handle)
galleryRoutes.delete('/:id', deleteController.handle)

module.exports = galleryRoutes
