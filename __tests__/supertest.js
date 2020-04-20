const request = require('supertest');

const server = 'http://localhost:3000';

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration for making requests to client gql server', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/gql/getschema', () => {
    const endpoint = "http://localhost:4000/graphql";
    it('responds with 200 status and application/json content type', () => {
      return request(server)
        .post('/gql/getschema')
        .send({ endpoint })
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('should have a schema object in the body of the response', () => {
      return request(server)
        .post('/gql/getschema')
        .send({ endpoint })
        .then((res) => expect(res.body).toHaveProperty('schema'));
    });

    it('should have a d3 object in the body of the response', () => {
      return request(server)
        .post('/gql/getschema')
        .send({ endpoint })
        .then((res) => expect(res.body).toHaveProperty('d3json'));
    });

    it('responds to invalid request with 400 status and error message in body', () => {
      return request(server)
        .post('/gql/getschema')
        .send('hello world')
        .expect(400)
        .then((res) => expect(res.body).toHaveProperty('err'));
    });

  });

  describe('/gql/getquery', () => {

  });

});
