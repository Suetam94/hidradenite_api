class UpdateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id, data) => {
    const article = await this.prisma.articles.update({
      where: {
        id
      },
      data
    })

    return {
      message: `${article.title} was updated successfully.`,
      article
    }
  }
}

module.exports = UpdateUseCase
