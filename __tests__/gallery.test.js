const { agent: request } = require('supertest')
const { PrismaClient } = require('@prisma/client')
const { app } = require('../src/app')
const path = require("path");

let prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM GALLERY;')
})

describe('Gallery tests suite', () => {
  const filePath = path.join(__dirname, './files/image.jpg')
  describe('POST - /gallery', () => {
    it('should create a media successfully', () => {
      return request(app).post('/gallery').attach('media', filePath).field('title', 'test_file').then((response) => {
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'test_file was created successfully.')
      })
    })
    it('should not create a media without title', () => {
      return request(app).post('/gallery').attach('media', filePath).then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"title" is required')
      })
    })
    it('should not create a media without file', () => {
      return request(app).post('/gallery').field('title', 'test_file').then((response) => {
        expect(response.status).toBe(400)
      })
    })
  })
})

afterAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM GALLERY;')
})
