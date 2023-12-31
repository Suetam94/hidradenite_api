const { Router } = require('express')
const routeLog = require('../helpers/routeLog')

const createArticleController = require('../controllers/articles/create')
const getArticleController = require('../controllers/articles/get')
const updateArticleController = require('../controllers/articles/update')
const deleteArticleController = require('../controllers/articles/delete')

const articleRoutes = Router()

articleRoutes.use(routeLog)
articleRoutes.post('/', createArticleController.handle)
articleRoutes.get('/', getArticleController.handle)
articleRoutes.put('/:id', updateArticleController.handle)
articleRoutes.delete('/:id', deleteArticleController.handle)

module.exports = articleRoutes
