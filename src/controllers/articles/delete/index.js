const { PrismaClient } = require('@prisma/client')
const DeleteUseCase = require('../../../useCases/articles/delete')
const DeleteController = require('./controller')
const schema = require('./schema')

const prisma = new PrismaClient()
const deleteUseCase = new DeleteUseCase({ prisma })
const deleteController = new DeleteController({ deleteUseCase, schema })

module.exports = deleteController
