const { agent: request } = require('supertest')
const { app } = require('../src/app')
const { PrismaClient } = require('@prisma/client')
const path = require('path')

const prisma = new PrismaClient()
let componentMediaId;

beforeAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM COMPONENTTEXT;')
  await prisma.$executeRawUnsafe('DELETE FROM COMPONENTMEDIA;')
  await prisma.$executeRawUnsafe('DELETE FROM COMPONENTS;')
  await prisma.$executeRawUnsafe(`INSERT INTO COMPONENTS VALUES ('1','footer');`)
})

describe('Components Media test suite', () => {
  const filePath = path.join(__dirname, './files/image.jpg')
  describe('Create new component media - POST /components-media', () => {
    it('should create a new component media successfully', () => {
      return request(app).post('/components-media').attach('media', filePath).field('title', 'test').field('identifier', 'footer 1').field('componentId', 1).then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'test was created successfully.')
      })
    })
    it('should not create a component media without media', () => {
      return request(app).post('/components-media').field('title', 'test').field('identifier', 'footer 1').field('componentId', 1).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"files" does not contain 1 required value(s)')
      })
    })
    it('should not create a component media without title', () => {
      return request(app).post('/components-media').attach('media', filePath).field('identifier', 'footer 1').field('componentId', 1).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"title" is required')
      })
    })
    it('should not create a new component without identifier', () => {
      return request(app).post('/components-media').attach('media', filePath).field('title', 'test').field('componentId', 1).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"identifier" is required')
      })
    })
    it('should not create a component media without componentId', () => {
      return request(app).post('/components-media').attach('media', filePath).field('title', 'test').field('identifier', 'footer 1').then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"componentId" is required')
      })
    })
  })
  describe('Get a component media - GET /components-media', () => {
    it('should get a component media successfully', () => {
      return request(app).get('/components-media').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(1)

        response.body.forEach(item => {
          expect(item).toHaveProperty('id')
          componentMediaId = item.id
          expect(item).toHaveProperty('title')
          expect(item).toHaveProperty('media')
          expect(item).toHaveProperty('description')
          expect(item).toHaveProperty('identifier')
          expect(item).toHaveProperty('componentId')
        })
      })
    })
  })
  describe('Delete a component media - DELETE /components-media', () => {
    it('should delete a component media successfully', () => {
      return request(app).delete(`/components-media/${componentMediaId}`).then(response => {
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('test was deleted with success.')
      })
    })
  })
})
