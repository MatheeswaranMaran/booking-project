const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const Routes = require('./routes/routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,() => {
        console.log("Connected to MongoDB and listening to " + process.env.PORT);
    })
}).catch((error)=>console.log(error));

app.use('/', Routes);  //using the routes defined
