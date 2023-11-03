class GetUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (params = null) => {
    return params === null
      ? await this.prisma.gallery.findMany()
      : await this.prisma.gallery.findMany({
        where: params
      })
  }
}

module.exports = GetUseCase
