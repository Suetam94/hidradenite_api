const { Router } = require('express')
const upload = require('../middlewares/importFile')
const createController = require('../controllers/components/componentMedia/create')
const getController = require('../controllers/components/componentMedia/get')
const deleteController = require('../controllers/components/componentMedia/delete')

const componentsMediaRoutes = Router()

componentsMediaRoutes.post('/', upload.array('media', 10), createController.handle)
componentsMediaRoutes.get('/', getController.handle)
componentsMediaRoutes.delete('/:id', deleteController.handle)

module.exports = componentsMediaRoutes
