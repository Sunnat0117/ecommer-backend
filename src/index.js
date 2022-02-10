const express = require("express");
const app = express();
const env =require("dotenv");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRouter = require("./router/auth")
const adminRouter = require("./router/admin/auth")

env.config();

// connecting line
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_ADMIN}:${process.env.MONGO_DB_PASSWORD}@cluster0.xcdqp.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
    .then(()=>{
        console.log("monbodb connected");
    })
    

app.use(bodyParser());
app.use('/api', authRouter);
app.use('/api', adminRouter);



app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${process.env.PORT} port`);
})





