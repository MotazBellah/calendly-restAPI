process.env.NODE_ENV = 'test'

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require("../../index.js");

const URI = "mongodb+srv://admin:xLyH3k15Q3M3FFJh@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority"


describe("GET /api/view/:username", () => {
    before(() => {
        mongoose.connect(URI)
    })

    after(() => {
        mongoose.connection.close()
    })


    it("OK, view another user’s meetings", (done) => {
        request(app).get("/api/view/Moataz")  
            .then((res) => {
                const body = res.body;
                console.log(body)
                expect(body.length).to.not.equal(0);
                done();
            })
            .catch((err) => done(err));
    });

    it("OK, view another non exsiting user’s meetings", (done) => {
        request(app).get("/api/view/notfound")
            .then((res) => {
                const body = res.body;
                console.log(body)
                expect(body).to.contain.property("message");
                expect(body.message).to.equal('notfound has no meeting yet');
                done();
            })
            .catch((err) => done(err));
    });

})
