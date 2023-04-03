require('dotenv').config()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(process.env.URI)

const User = new Schema({
    username: {type: String, required: true},
    password: String,
    totalPoints: Number
})

module.exports = mongoose.model('User', User)