class DeleteUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id) => {
    const media = await this.prisma.componentMedia.findUnique({
      where: {
        id
      }
    })

    if (!media) {
      const error = new Error('There is no media with the given id')
      error.status = 400
      error.type = 'not exist'
      throw error
    }

    await this.prisma.componentMedia.delete({
      where: {
        id
      }
    })

    return {
      message: `${media.title} was deleted with success.`
    }
  }
}

module.exports = DeleteUseCase
