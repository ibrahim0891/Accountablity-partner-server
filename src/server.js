

require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const apsRouter = require('../routes/aps-router');


console.log(process.env.USER_DATA_MODEL );
 
 
const port = process.env.PORT || 3000;
const dbURL = process.env.DB_URL;

const app = express();
 
app.use(cors())
app.use(express.json())

mongoose.connect(dbURL).then(() => {
    console.log('Connection with databsase successfull');
}).catch((err) => {
    console.log(err);
})

app.use('/aps', apsRouter)

function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err)
    }
    res.status(500).json({ error: err })
}

app.listen((port), () => {
    console.log(`Listening on portport ${port}`);

})