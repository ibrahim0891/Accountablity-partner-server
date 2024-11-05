

require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')

const apsRouter = require('../routes/aps-router');


// PORT = 3000
// DB_URL = 'mongodb+srv://nijhum0891:ibrahim0891@cluster0.iw7vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const port = process.env.PORT || 3000;
const dbURL = 'mongodb+srv://nijhum0891:ibrahim0891@cluster0.iw7vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


const app = express();

app.use(cors())
app.use(express.json())
app.use('/aps', apsRouter)



mongoose.connect(dbURL).then(() => {
    console.log('Connection with databsase successfull');
}).catch((err) => {
    console.log(err);
})


function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err)
    }
    res.status(500).json({ error: err })
}

app.listen((port), () => {
    console.log(`Listening on portport ${port}`);

})