class DeleteUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id) => {
    const component = await this.prisma.componentText.findUnique({
      where: {
        id
      }
    })

    if (!component) {
      const error = new Error('There is no component text with the given id')
      error.status = 400
      error.type = 'not exist'
      throw error
    }

    await this.prisma.componentText.delete({
      where: {
        id
      }
    })

    return {
      message: 'Component text was deleted with success.'
    }
  }
}

module.exports = DeleteUseCase
