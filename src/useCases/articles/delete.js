class DeleteUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id) => {
    const article = await this.prisma.articles.findUnique({
      where: {
        id
      }
    })

    if (!article) {
      const error = new Error('There is no article with the given id')
      error.status = 400
      error.type = 'not exist'
      throw error
    }

    await this.prisma.articles.delete({
      where: {
        id
      }
    })

    return {
      message: `${article.title} was deleted with success.`
    }
  }
}

module.exports = DeleteUseCase
