class DeleteUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id) => {
    const component = await this.prisma.components.findUnique({
      where: {
        id
      }
    })

    if (!component) {
      const error = new Error('There is no component with the given id')
      error.status = 400
      error.type = 'not exist'
      throw error
    }

    await this.prisma.components.delete({
      where: {
        id
      }
    })

    return {
      message: `${component.component} was deleted with success.`
    }
  }
}

module.exports = DeleteUseCase
