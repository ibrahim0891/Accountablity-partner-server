

const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')

const apsRouter = require('../routes/aps-router');
const env = require('../enviroment');

const port = env.PORT;
const app = express();    

app.use(cors())
app.use(express.json())

mongoose.connect(env.DB_URL).then(() => {
    console.log('Connection with databsase successfull');
}).catch((err) => {
    console.log(err);
})

app.use('/aps',apsRouter)

function errorHandler(err , req , res ,next ){
    if (res.headerSent) {
        return next(err)
    }
    res.status(500).json({ error: err })
}

app.listen((port), () => {
    console.log(`Listening on port ${port}`);

})