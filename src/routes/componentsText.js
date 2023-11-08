const { Router } = require('express')

const createComponentTextController = require('../controllers/components/componentText/create')
const getComponentTextController = require('../controllers/components/componentText/get')
const updateComponentTextController = require('../controllers/components/componentText/update')
const deleteComponentTextController = require('../controllers/components/componentText/delete')

const componentTextRoutes = Router()

componentTextRoutes.post('/', createComponentTextController.handle)
componentTextRoutes.get('/', getComponentTextController.handle)
componentTextRoutes.put('/:id', updateComponentTextController.handle)
componentTextRoutes.delete('/:id', deleteComponentTextController.handle)

module.exports = componentTextRoutes
