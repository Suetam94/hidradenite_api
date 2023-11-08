const { agent: request } = require('supertest')
const { PrismaClient } = require('@prisma/client')
const { app } = require('../src/app')

let prisma = new PrismaClient()

const insertedComponent = {
  id: 1,
  component: 'footer',
}

beforeAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM COMPONENTS;')
  await prisma.$executeRawUnsafe(`INSERT INTO COMPONENTS VALUES ('1','footer');`)
})

describe('Components test suite', () => {
  describe('Create - POST /components', () => {
    it('should create a new component successfully', () => {
      return request(app)
        .post('/components')
        .send({
          component: 'header',
        })
        .then((response) => {
          expect(response.status).toBe(201)
          expect(response.body).toHaveProperty('message', 'header was created successfully.')
          expect(response.body).toHaveProperty('component')
          expect(response.body.component).toHaveProperty('component', 'header')
        })
    })
    it('should not create a component without component title', () => {
      return request(app)
        .post('/components')
        .send({
          component: '',
        })
        .then((response) => {
          expect(response.status).toBe(400)
          expect(response.body).toHaveProperty(
            'message',
            '"component" must be one of [header, footer, home, understand_hidradenitis, support_group, scientific_info, frequently_questions, about_us]'
          )
          expect(response.body).toHaveProperty('type', 'validation error')
        })
    })
  })
  describe('List - GET /components', () => {
    it('should list all the created components', () => {
      return request(app)
        .get('/components')
        .then((response) => {
          expect(response.status).toBe(200)
          expect(response.body.length).toBeGreaterThanOrEqual(1)
        })
    })
    it('should list all the created components by component name', () => {
      return request(app)
        .get('/components?component=header')
        .then((response) => {
          expect(response.status).toBe(200)
          expect(response.body.length).toBeGreaterThanOrEqual(1)
        })
    })
  })
  describe('Update - PUT /components/:id', () => {
    const responseErrorObject = {
      message:
        '"component" must be one of [header, footer, home, understand_hidradenitis, support_group, scientific_info, frequently_questions, about_us]',
      status: 400,
      type: 'validation error',
    }

    it('should update successfully an existing component', () => {
      return request(app)
        .put('/components/1')
        .send({
          component: 'header',
        })
        .then((response) => {
          const updatedComponent = { ...insertedComponent, component: 'header' }
          expect(response.status).toBe(200)
          expect(response.body).toHaveProperty('message', 'header was updated successfully.')
          expect(response.body).toHaveProperty('component')
          expect(response.body.component).toMatchObject(updatedComponent)
        })
    })
    it('should not update an existing component without component name', () => {
      return request(app)
        .put('/components/1')
        .send({
          component: '',
        })
        .then((response) => {
          expect(response.status).toBe(400)
          expect(response.body).toMatchObject(responseErrorObject)
        })
    })
    it('should not update an existing component with an invalid component name', () => {
      return request(app)
        .put('/components/1')
        .send({
          component: 'test'
        })
        .then((response) => {
          expect(response.status).toBe(400)
          expect(response.body).toMatchObject(responseErrorObject)
        })
    })
  })
  describe('Delete - DELETE /components/:id', () => {
    it('should delete successfully an existing component', () => {
      return request(app).delete('/components/1').then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', 'header was deleted with success.')
      })
    })
  })
})
