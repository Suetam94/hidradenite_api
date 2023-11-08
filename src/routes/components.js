const { Router } = require('express')

const createComponentController = require('../controllers/components/component/create')
const getComponentController = require('../controllers/components/component/get')
const updateComponentController = require('../controllers/components/component/update')
const deleteComponentController = require('../controllers/components/component/delete')

const componentRoutes = Router()

componentRoutes.post('/', createComponentController.handle)
componentRoutes.get('/', getComponentController.handle)
componentRoutes.put('/:id', updateComponentController.handle)
componentRoutes.delete('/:id', deleteComponentController.handle)

module.exports = componentRoutes
