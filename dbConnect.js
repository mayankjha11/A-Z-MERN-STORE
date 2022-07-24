require('dotenv').config()
const mongoose = require('mongoose')

const URL = 'mongodb+srv://mayankjha:fineline@cluster0.ewawg.mongodb.net/mernstore?retryWrites=true&w=majority'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})