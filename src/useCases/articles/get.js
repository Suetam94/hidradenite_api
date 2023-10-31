class GetUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (params = null) => {
    return params === null
      ? await this.prisma.articles.findMany()
      : await this.prisma.articles.findMany({
        where: params
      })
  }
}

module.exports = GetUseCase
