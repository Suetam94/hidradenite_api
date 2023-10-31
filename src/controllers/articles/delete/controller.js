class DeleteController {
  constructor ({ deleteUseCase, schema }) {
    this.deleteUseCase = deleteUseCase
    this.schema = schema
  }

  handle = async (req, res, next) => {
    const { id } = req.params
    try {
      const validatedData = await this.schema({ id })
      delete validatedData.id
      const data = await this.deleteUseCase.exec(Number(id))
      res.status(200).json(data).send()
    } catch (e) {
      next(e)
    }
  }
}

module.exports = DeleteController
