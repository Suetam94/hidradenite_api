class UpdateController {
  constructor ({ updateUseCase, schema }) {
    this.updateUseCase = updateUseCase
    this.schema = schema
  }

  handle = async (req, res, next) => {
    const { body, params } = req
    try {
      const validatedData = await this.schema({ ...body, id: params.id })
      delete validatedData.id
      const data = await this.updateUseCase.exec(Number(params.id), validatedData)
      res.status(200).json(data).send()
    } catch (e) {
      next(e)
    }
  }
}

module.exports = UpdateController
