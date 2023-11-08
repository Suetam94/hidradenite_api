class CreateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (data) => {
    const component = await this.prisma.components.create({
      data: {
        component: data.component
      }
    })

    return {
      message: `${data.component} was created successfully.`,
      component
    }
  }
}

module.exports = CreateUseCase
