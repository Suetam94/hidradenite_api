const fs = require('fs')
class CreateUseCase {
  constructor ({ prisma }) {
    this.prisma = prisma
  }

  exec = async (data) => {
    const files = fs.readdirSync('./tmp')
    delete data.files

    for (const file of files) {
      const openedFile = fs.readFileSync(`./tmp/${file}`)
      await this.prisma.componentMedia.create({
        data: {
          ...data,
          media: openedFile
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
