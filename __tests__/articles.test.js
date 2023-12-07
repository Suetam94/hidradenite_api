const { agent: request } = require('supertest')
const { PrismaClient } = require('@prisma/client')
const { app } = require('../src/app')

let prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM ARTICLES;')
  await prisma.$executeRawUnsafe(`INSERT INTO ARTICLES VALUES ('10000','test_test', 'https://www.google.com', 'patient', null);`)
})

function getSnippet(response) {
  expect(response.status).toBe(200)
  expect(response.body.length).toBeGreaterThanOrEqual(1)
  expect(response.body[0]).toHaveProperty('id')
  expect(response.body[0]).toHaveProperty('title', 'test_test')
  expect(response.body[0]).toHaveProperty('url', 'https://www.google.com')
  expect(response.body[0]).toHaveProperty('category', 'patient')
}

describe('Articles tests', () => {
  describe('Create - POST /articles', () => {
    it('should create a new article successfully', () => {
      const article = {
        title: 'test',
        url: 'https://www.google.com',
        category: 'doctor'
      }
      return request(app).post('/articles').send(article).then((response) => {
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', `${article.title} was created successfully.`)
        expect(response.body).toHaveProperty('article')
        expect(response.body.article).toHaveProperty('title', 'test')
        expect(response.body.article).toHaveProperty('url', 'https://www.google.com')
        expect(response.body.article).toHaveProperty('category', 'doctor')

        prisma.articles.findFirst({ where : { id: response.body.article.id } }).then(result => {
          expect(result).toHaveProperty('id', response.body.article.id)
          expect(result).toHaveProperty('title', response.body.article.title)
          expect(result).toHaveProperty('url', response.body.article.url)
          expect(result).toHaveProperty('category', response.body.article.category)
        })
      })
    })

    it('should not create a new article without title', () => {
      const article = {
        title: '',
        url: 'https://www.google.com',
        category: 'doctor'
      }
      return request(app).post('/articles').send(article).then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
      })
    });

    it('should not create a new article without url', () => {
      const article = {
        title: 'test',
        url: '',
        category: 'doctor'
      }
      return request(app).post('/articles').send(article).then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    });

    it('should not create a new article without doctor', () => {
      const article = {
        title: 'test',
        url: 'https://www.google.com',
        category: ''
      }
      return request(app).post('/articles').send(article).then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    });

    it('should not create a new article with an invalid url', () => {
      const article = {
        title: 'test',
        url: 'its not url',
        category: 'doctor'
      }
      return request(app).post('/articles').send(article).then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    });
  })
  describe('Get/List - GET /articles', () => {
    it('should get/list articles successfully', () => {
      return request(app).get('/articles').then((response) => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(1)
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0]).toHaveProperty('title')
        expect(response.body[0]).toHaveProperty('url')
        expect(response.body[0]).toHaveProperty('category')
      })
    });
    it('should get/list articles by title successfully', () => {
      return request(app).get('/articles?title=test_test').then((response) => {
        getSnippet(response)
      })
    });
    it('should get/list articles by url successfully', () => {
      return request(app).get('/articles?url=https://www.google.com').then((response) => {
        getSnippet(response)
      })
    });
    it('should get/list articles by category successfully', () => {
      return request(app).get('/articles?category=patient').then((response) => {
        getSnippet(response)
      })
    });
  })
  describe('Update - PUT /articles', () => {
    it('should update an article successfully', () => {
      return request(app).put('/articles/10000').send({
        title: 'test_updated_title'
      }).then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', 'test_updated_title was updated successfully.')
        expect(response.body).toHaveProperty('article')
        expect(response.body.article).toHaveProperty('title', 'test_updated_title')
        expect(response.body.article).toHaveProperty('url', 'https://www.google.com')
        expect(response.body.article).toHaveProperty('category', 'patient')
      })
    });
    it('should not update an article without id', () => {
      return request(app).put('/articles').send({
        title: 'test_updated_title'
      }).then(response => {
        expect(response.status).toBe(404)
      })
    });
    it('should not update an article with empty title', () => {
      return request(app).put('/articles/10000').send({
        title: ''
      }).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"title" is not allowed to be empty')
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    });
    it('should not update an article with empty url', () => {
      return request(app).put('/articles/10000').send({
        url: ''
      }).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"url" is not allowed to be empty')
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    });
    it('should not update an article with empty category', () => {
      return request(app).put('/articles/10000').send({
        category: ''
      }).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"category" must be one of [patient, doctor]')
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    });
    it('should not update an article with invalid category', () => {
      return request(app).put('/articles/10000').send({
        category: 'test'
      }).then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', '"category" must be one of [patient, doctor]')
        expect(response.body).toHaveProperty('type', 'validation error')
      })
    });
  })
  describe('Delete - DELETE /articles', () => {
    it('should delete an article successfully', () => {
      return request(app).delete('/articles/10000').then(response =>  {
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message')
      })
    });
    it('should not delete an article without id', () => {
      return request(app).delete('/articles').then(response =>  {
        expect(response.status).toBe(404)
      })
    });
    it('should not delete an article with id that not exists', () => {
      return request(app).delete('/articles/12345678').then(response =>  {
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'There is no article with the given id')
        expect(response.body).toHaveProperty('status', 400)
        expect(response.body).toHaveProperty('type', 'not exist')
      })
    });
  })
})

afterAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM ARTICLES;')
})
