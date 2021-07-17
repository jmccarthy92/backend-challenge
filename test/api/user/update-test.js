let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('update', () => {
      let globalAuth
      let body

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
        body = {
          email: `${mockData.uuid()}@test.com`,
          firstName: mockData.uuid(),
          lastName: mockData.uuid()
        }
      })

      it('should fail if auth user does not match user id in url', () => {
        return agent
          .client()
          .put(`/user/${mockData.uuid()}`)
          .send(body)
          .set('authorization', globalAuth.token)
          .expect(403)
          .promise()
      })

      it('should update user if auth user matches id in url', async () => {
        const user = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .send(body)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(user)
        user.email.should.equal(body.email)
        user.firstName.should.equal(body.firstName)
        user.lastName.should.equal(body.lastName)
      })
    })
  })
})
