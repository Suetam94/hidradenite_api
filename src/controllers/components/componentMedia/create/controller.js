class CreateController {
  constructor ({ createUseCase, schema }) {
    this.createUseCase = createUseCase
    this.schema = schema
  }

  handle = async (req, res, next) => {
    const { body, files } = req

    try {
      const requestData = { ...body, files }
      const validatedData = await this.schema(requestData)
      const data = await this.createUseCase.exec(validatedData)
      res.status(201).json(data).send()
    } catch (e) {
      next(e)
    }
  }
}

module.exports = CreateController
