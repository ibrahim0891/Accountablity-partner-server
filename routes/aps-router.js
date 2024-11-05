

const express = require('express')
const mongoose = require('mongoose')
const { userSchema, transectionSchema } = require('../schemas/aps-schemas')
const env = require('../enviroment')
const { genarateRandomToken, userAlreadyExists } = require('../utilities/utilities')


const apsRouter = express.Router()

 


const User = new mongoose.model( "User", userSchema)

const Transaction = new mongoose.model("Transaction", transectionSchema)
apsRouter.get('/getToken', async (req, res) => {
    const user = new User()
    const uid = req.headers.uid

    const password = req.headers.password
 


})

//get all users 
apsRouter.get('/user', async (req, res) => {
    const user = await User.find({}).select({
        password: 0,
        token: 0
    })
    res.status(200).send(user)
})


//get user by id
apsRouter.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).send(user)
})


//handle signup route
apsRouter.post('/user/signup', async (req, res) => {
    const user = new User(req.body)

    const existingUser = await userAlreadyExists(User, req.body.email)

    if (existingUser.userExist == false) {
        const token = genarateRandomToken()
        user.token = token
        user.save()
        res.status(201).send({ message: "User created Successfully..", token: token , uid: user._id.toString() })
    } else {
        res.status(409).send({ message: "User already exist" })
    }
})

//handle login route
apsRouter.post('/user/login', async (req, res) => {
    const { userExist, user } = await userAlreadyExists(User, req.body.email)
    if (userExist == true && req.body.password == user.password) {
        const token = genarateRandomToken()
        user.token = token
        user.save()
        res.status(200).send({ token: token, uid: user._id.toString() })
    } else {
        res.status(400).send({ message: "User not exist" })
    }
})

//handle logout route
apsRouter.post('/user/logout', async (req, res) => {
    const { userExist, user } = await userAlreadyExists(User, req.body.email)
    if (userExist == true && req.body.token == user.token) {
        user.token = ''
        user.save()
        res.status(200).send({ message: "User Logout Successfully.." })
    } else {
        res.status(404).send({ message: "User not exist" })
    }
})


apsRouter.post('/user/addTransaction', async (req, res) => {
    const { userExist, user } = await userAlreadyExists(User, req.headers.email)

    if (userExist == true && req.headers.token == user.token) { 

        const existingTransaction = user.transactions
        const transaction = new Transaction(req.body) 
        try {
            const matchingTransaction = existingTransaction.find(t => 
                t.date.toISOString().split('T')[0] === req.body.date.split('T')[0]
            )

            if (matchingTransaction) {
                matchingTransaction.amount = req.body.amount
                console.log(matchingTransaction);
                await user.save()
            } else {
                user.transactions.push(transaction)
                await user.save()
            }

        } catch (error) {
            console.log(error);
        }

        res.status(200).send({ message: existingTransaction ? "Transaction updated Successfully.." : "Transaction added Successfully.." })
    } else {
        res.status(403).send({ message: "User not exist" })
    }
})


apsRouter.delete('/user/deleteAccount', async (req, res) => {
    const { userExist, user } = await userAlreadyExists(User, req.headers.email)
    if (userExist == true && req.headers.token == user.token) { 
        await User.findByIdAndDelete(user._id)      
          res.status(200).send({ message: "User deleted Successfully.." })
    } else {
        res.status(404).send({ message: "User not exist" })
    }
})

module.exports = apsRouter