const { agent: request } = require('supertest')
const { app } = require('../src/app')
const { PrismaClient } = require('@prisma/client')

let prisma = new PrismaClient()

const insertedComponentText = {
  componentId: 1,
  text: 'Test text',
  identifier: 'test'
}

beforeAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM COMPONENTTEXT;')
  await prisma.$executeRawUnsafe('DELETE FROM COMPONENTS;')
  await prisma.$executeRawUnsafe(`INSERT INTO COMPONENTS VALUES ('1','footer');`)
  await prisma.$executeRawUnsafe(`INSERT INTO COMPONENTTEXT VALUES ('1','initial test', 'test', 1);`)
})

describe('Components Text Suites', () => {
  describe('Create - POST /components-text', () => {
    it('should create a new text for an existing component', () => {
      return request(app).post('/components-text').send(insertedComponentText).then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'Component text was created successfully.')
        expect(response.body).toHaveProperty('component')
        expect(response.body.component).toHaveProperty('id')
        expect(response.body.component).toHaveProperty('text', 'Test text')
        expect(response.body.component).toHaveProperty('identifier', 'test')
        expect(response.body.component).toHaveProperty('componentId', 1)
      })
    })
    it('should not create a new text if no componentId is sent', () => {
      const testObject = { ...insertedComponentText }
      delete testObject.componentId
      return request(app).post('/components-text').send(testObject).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"componentId" is required')
        expect(response.body).toHaveProperty('status', 400)
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    })
    it('should not create a new text if no text is sent', () => {
      const testObject = { ...insertedComponentText }
      delete testObject.text
      return request(app).post('/components-text').send(testObject).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"text" is required')
        expect(response.body).toHaveProperty('status', 400)
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    })
    it('should not create a new text if no identifier is sent', () => {
      const testObject = { ...insertedComponentText }
      delete testObject.identifier
      return request(app).post('/components-text').send(testObject).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"identifier" is required')
        expect(response.body).toHaveProperty('status', 400)
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    })
  })
  describe('Get/List - GET /components-text', () => {
    it('should list a component texts successfully', () => {
      return request(app).get('/components-text?componentId=1').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(1)

        response.body.forEach(item => {
          expect(item).toHaveProperty('id')
          expect(item).toHaveProperty('text')
          expect(item).toHaveProperty('identifier')
          expect(item).toHaveProperty('componentId')
          expect(item.id).toBeTruthy()
          expect(item.text).toBeTruthy()
          expect(item.identifier).toBeTruthy()
          expect(item.componentId).toBeTruthy()
        })
      })
    })
    it('should not list a component texts if no componentId is sent', () => {
      return request(app).get('/components-text').then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"componentId" is required')
        expect(response.body).toHaveProperty('status', 400)
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    })
  })
  describe('Update - PUT /components-text/:id', () => {
    it('should update a component text successfully', () => {
      return request(app).put('/components-text/1').send({
        text: 'updated text'
      }).then(response => {
        const testObject = {...insertedComponentText}
        testObject.text = 'updated text'
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Component text was updated successfully.')
        expect(response.body.componentText).toMatchObject(testObject)
      })
    })
    it('should not update a component text with empty text', () => {
      return request(app).put('/components-text/1').send({
        text: ''
      }).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"text" is not allowed to be empty')
        expect(response.body).toHaveProperty('status', 400)
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    })
  })
  describe('Delete - DELETE /components-text/:id', () => {
    it('should delete successfully a component text', () => {
      return request(app).delete('/components-text/1').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Component text was deleted with success.')
      })
    })
  })
})
