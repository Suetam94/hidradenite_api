const fs = require('fs')
class CreateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (data) => {
    const files = fs.readdirSync('./tmp')
    for (const file of files) {
      const openedFile = fs.readFileSync(`./tmp/${file}`)
      await this.prisma.gallery.create({
        data: {
          title: data.title,
          media: openedFile,
          description: data.description ?? null
        }
      })
      fs.unlinkSync(`./tmp/${file}`)
    }

    return {
      message: `${data.title} was created successfully.`
    }
  }
}

module.exports = CreateUseCase
