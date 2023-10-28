const { Router } = require('express')
const createArticleController = require('../Controllers/Articles/Create')

const articleRoutes = Router()

articleRoutes.post('/', createArticleController.handle)

module.exports = articleRoutes
