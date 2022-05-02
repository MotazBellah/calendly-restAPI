process.env.NODE_ENV = 'test'

const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');

const app = require("../../index.js");

const URI = "mongodb+srv://admin:xLyH3k15Q3M3FFJh@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority"


describe("POST /api/schedule_meeting", () => {
    before(() => {
        mongoose.connect(URI)
    })

    after(() => {
        mongoose.connection.close()
    })


    // it("OK, creating a new meeting", (done) => {
    //     request(app).post("/api/schedule_meeting")
    //         .send({ "title": "test", "meetingCreator": "Moataz", "meetingWith": "Ahmed",
    //             "slotDate": "2022-05-04", "slotTime": "23:05", "duration": "30" })
    //         .then((res) => {
    //             const body = res.body;
    //             console.log(body)
    //             expect(body).to.contain.property("_id");
    //             expect(body).to.contain.property("title");
    //             expect(body).to.contain.property("slotDate");
    //             expect(body).to.contain.property("slotTime");
    //             done();
    //         })
    //         .catch((err) => done(err));
    // });

    // it("Fail, creating a new meeting, overlaps with anthor meeting", (done) => {
    //     request(app).post("/api/schedule_meeting")
    //         .send({ "title": "test", "meetingCreator": "Moataz", "meetingWith": "Ahmed",
    //             "slotDate": "2022-05-03", "slotTime": "19:05", "duration": "30" })
    //         .then((res) => {
    //             const body = res.body;
    //             console.log(body)
    //             expect(body).to.contain.property("error");
    //             expect(body.error).to.equal('Ahmed is busy, Please select different time slot');
        
    //             done();
    //         })
    //         .catch((err) => done(err));
    // });

})
