const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeAll(async () => {
    await db.seed.run()
})

describe('[GET] /hobbits', () => {
    test('responds with 200 OK', async () => {
        const res = await request(server).get('/hobbits')
        expect(res.status).toBe(200)
    })
})
describe('[POST] /hobbits', () => {
    const bilbo = {name:'bilbo'}
    test('adds a hobbit to the db', async () => {
        await request(server).post('/hobbits').send(bilbo)
        expect(await db('hobbits')).toHaveLength(5)
    })
})