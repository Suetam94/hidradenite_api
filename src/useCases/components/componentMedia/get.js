class GetUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (params = null) => {
    return params === null
      ? await this.prisma.componentMedia.findMany()
      : await this.prisma.componentMedia.findMany({
        where: params
      })
  }
}

module.exports = GetUseCase
