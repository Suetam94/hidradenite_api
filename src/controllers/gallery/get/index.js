const { PrismaClient } = require('@prisma/client')
const GetUseCase = require('../../../useCases/gallery/get')
const GetController = require('./controller')
const schema = require('./schema')

const prisma = new PrismaClient()
const getUseCase = new GetUseCase({ prisma })
const getController = new GetController({ getUseCase, schema })

module.exports = getController
