class GetUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (params = null) => {
    return params === null
      ? await this.prisma.componentText.findMany()
      : await this.prisma.componentText.findMany({
        where: params
      })
  }
}

module.exports = GetUseCase
