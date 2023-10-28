const { agent: request } = require('supertest')
const { PrismaClient } = require('@prisma/client')
const { app } = require('../src/app')

let prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM ARTICLES;')
})

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
  });
})

afterAll(async () => {
  await prisma.$executeRawUnsafe('DELETE FROM ARTICLES;')
})
