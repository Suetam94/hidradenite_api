class CreateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (data) => {
    const component = await this.prisma.componentText.create({
      data
    })

    return {
      message: 'Component text was created successfully.',
      component
    }
  }
}

module.exports = CreateUseCase
