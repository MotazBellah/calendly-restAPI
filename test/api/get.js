process.env.NODE_ENV = 'test'
require('dotenv').config()

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require("../../index.js");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority`


describe("GET /api/view/:username", () => {

    it("OK, view another user’s meetings", (done) => {
        request(app).get("/api/view/Moataz")  
            .then((res) => {
                const body = res.body;
                expect(body.length).to.not.equal(0);
                done();
            })
            .catch((err) => done(err));
    });

    it("OK, view another non exsiting user’s meetings", (done) => {
        request(app).get("/api/view/notfound")
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("message");
                expect(body.message).to.equal('notfound has no meeting yet');
                done();
            })
            .catch((err) => done(err));
    });

})
