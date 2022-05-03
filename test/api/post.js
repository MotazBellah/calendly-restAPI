process.env.NODE_ENV = 'test'
require('dotenv').config()

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require("../../index.js");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority`


describe("POST /api/schedule_meeting", function() {
    
    it("Fail, creating a new meeting with non exist user", (done) => {
        
        request(app).post("/api/schedule_meeting")
            .send({ "title": "test", "meetingCreator": "Moataz", "meetingWith": "Not found",
                "slotDate": "2033-05-07", "slotTime": "23:05", "duration": "30" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("error");
                expect(body.error).to.equal('User does not exist');
                done();
            })
            .catch((err) => done(err));
    });

    
    it("Fail, creating a new meeting, overlaps with anthor meeting", (done) => {
        request(app).post("/api/schedule_meeting")
            .send({ "title": "test", "meetingCreator": "Moataz", "meetingWith": "Ahmed",
                "slotDate": "2022-05-03", "slotTime": "19:05", "duration": "30" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("error");
                expect(body.error).to.equal('Ahmed is busy, Please select different time slot');
        
                done();
            })
            .catch((err) => done(err));
    });

})

