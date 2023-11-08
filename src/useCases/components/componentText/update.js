class UpdateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id, data) => {
    const componentText = await this.prisma.componentText.update({
      where: {
        id
      },
      data
    })

    return {
      message: 'Component text was updated successfully.',
      componentText
    }
  }
}

module.exports = UpdateUseCase
