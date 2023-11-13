const { agent: request } = require('supertest')
const { PrismaClient } = require('@prisma/client')
const { app } = require('../src/app')
const path = require("path");

let prisma = new PrismaClient()
let galleryId

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
  describe('Get a media - GET /gallery', () => {
    it('should get a component media successfully', () => {
      return request(app).get('/gallery').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(1)

        response.body.forEach(item => {
          expect(item).toHaveProperty('id')
          galleryId = item.id
          expect(item).toHaveProperty('title')
          expect(item).toHaveProperty('media')
          expect(item).toHaveProperty('description')
        })
      })
    })
  })
  describe('Delete a media - DELETE /components-media', () => {
    it('should delete a media successfully', () => {
      return request(app).delete(`/gallery/${galleryId}`).then(response => {
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('test_file was deleted with success.')
      })
    })
  })
})

afterAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM GALLERY;')
})
