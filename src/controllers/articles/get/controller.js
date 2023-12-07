class GetController {
  constructor ({ getUseCase, schema }) {
    this.getUseCase = getUseCase
    this.schema = schema
  }

  handle = async (req, res, next) => {
    const { query } = req
    try {
      const validatedData = query ? await this.schema(query) : query
      const data = await this.getUseCase.exec(validatedData)
      res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = GetController
