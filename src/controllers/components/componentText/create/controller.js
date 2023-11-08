class CreateController {
  constructor ({ createUseCase, schema }) {
    this.createUseCase = createUseCase
    this.schema = schema
  }

  handle = async (req, res, next) => {
    const { body } = req
    try {
      const validatedData = await this.schema(body)
      const data = await this.createUseCase.exec(validatedData)
      res.status(201).json(data).send()
    } catch (e) {
      next(e)
    }
  }
}

module.exports = CreateController
