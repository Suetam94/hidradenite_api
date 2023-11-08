class UpdateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id, data) => {
    const component = await this.prisma.componentText.update({
      where: {
        id
      },
      data
    })

    return {
      message: 'Component text was updated successfully.',
      component
    }
  }
}

module.exports = UpdateUseCase
