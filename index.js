const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/user')
const Meeting = require('./models/meeting')
const app = express()

const URI = "mongodb+srv://admin:xLyH3k15Q3M3FFJh@cluster0.tkhkv.mongodb.net/calendly?retryWrites=true&w=majority"
mongoose.connect(URI)

app.get('/', function (req, res) {
    
    res.send('Hello World')
})


app.listen(3000)