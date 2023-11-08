class GetUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (params = null) => {
    return params === null
      ? await this.prisma.components.findMany()
      : await this.prisma.components.findMany({
        where: params
      })
  }
}

module.exports = GetUseCase
