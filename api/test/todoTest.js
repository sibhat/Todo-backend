const request = require('supertest');
const app = require("../../app");
let testInput = {
    "title": "test_input1",
    description: "test_description1",
};
describe("first initial test", ()=>{
    it("should get json response back", ()=>{
        request(app)
            .get('/api/todos/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
    });
    it("[post] /api/todos test", ()=>{
        request(app)
            .post('/api/todos/')
            .send(testInput)
            .expect('Content-Type', /json/)
            .expect(200)
    })
});
