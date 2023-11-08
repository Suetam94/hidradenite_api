const { PrismaClient } = require('@prisma/client')
const CreateUseCase = require('../../../../useCases/components/componentText/create')
const CreateController = require('./controller')
const schema = require('./schema')

const prisma = new PrismaClient()
const createUseCase = new CreateUseCase({ prisma })
const createController = new CreateController({ createUseCase, schema })

module.exports = createController
