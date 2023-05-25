const db = require('../../data/dbConfig')
const Hobbits = require('./hobbits-model')

beforeEach(async () => { //allows for the db to work on a clean set of data for every test
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=> { //Runs the data for
    await db.seed.run()
})

test('enviroment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('getAll', () => {
    test('resolves all the hobbits in the table', async () =>{
        const result = await Hobbits.getAll()
        expect(result).toHaveLength(4)
    })
})
describe('getById', () => {
    test('resolves hobbit by given id', async()=>{
        const result = await Hobbits.getById(1)
        expect(result).toMatchObject({ name: 'sam'})
    })
})
describe('insert', () => {
    const bilbo = { name: 'bilbo'}
    test('resolves the newly created hobbits', async () => {
    const result = await Hobbits.insert(bilbo)
    expect(result).toMatchObject(bilbo)
    })
    test('adds the hobbit to the hobbits table', async () => {
        await Hobbits.insert(bilbo)
        const record = await db('hobbits')
        expect(record).toHaveLength(5)
    })
})