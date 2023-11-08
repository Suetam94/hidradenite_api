const { PrismaClient } = require('@prisma/client')
const UpdateUseCase = require('../../../../useCases/components/component/update')
const UpdateController = require('./controller')
const schema = require('./schema')

const prisma = new PrismaClient()
const updateUseCase = new UpdateUseCase({ prisma })
const updateController = new UpdateController({ updateUseCase, schema })

module.exports = updateController
