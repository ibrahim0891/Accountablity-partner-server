



const mongoose = require('mongoose') 
const env = require('../enviroment')

const transectionSchema = mongoose.Schema({
     
    date: {
        type: Date,
        required: true
    } ,
    amount: {
        type: Number,
        required: true
    }
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: String,
    transactions: [transectionSchema] , 
    token : String 
})


userSchema.methods = {
     getEmail : function(){ 
    }
}


module.exports = { userSchema , transectionSchema}