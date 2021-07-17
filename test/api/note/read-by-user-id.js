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
    describe('read-by-user-id', () => {
      let globalAuth
      let globalNote

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
        globalNote = await mockData.mockNote({ user: globalAuth.user })
      })

      it('should fail if auth user does not match user id in url', () => {
        return agent
          .client()
          .get(`/user/${mockData.uuid()}/notes`)
          .set('authorization', globalAuth.token)
          .expect(403)
          .promise()
      })

      it('should read notes from user if auth user matches id in url', async () => {
        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(notes)

        const note = notes.pop()
        note.message.should.equal(globalNote.message)
        note.title.should.equal(globalNote.title)
        note.id.should.equal(globalNote.id)
        note.user.should.equal(globalAuth.user)
      })
    })
  })
})
