let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('note', () => {
    describe('create', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should create a note for the user', async () => {
        const body = {
          title: 'Test',
          message: 'Note'
        }
        const note = await agent
          .client()
          .post(`/note`)
          .send(body)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(note)

        note.message.should.equal(body.message)
        note.title.should.equal(body.title)
        note.user.should.equal(globalAuth.user)
      })
    })
  })
})
