class CreateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (data) => {
    const article = await this.prisma.articles.create({
      data
    })

    return {
      message: `${article.title} was created successfully.`,
      article
    }
  }
}

module.exports = CreateUseCase
