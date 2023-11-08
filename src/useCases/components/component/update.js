class UpdateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (id, data) => {
    const component = await this.prisma.components.update({
      where: {
        id
      },
      data
    })

    return {
      message: `${component.component} was updated successfully.`,
      component
    }
  }
}

module.exports = UpdateUseCase
