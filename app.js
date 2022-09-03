const express = require('express');
const mongoose = require('mongoose');

const app = express();
 
const db = require('./config/keys').MongoURI;

//connect to the mongodb 
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected to mongoDB "))
.catch(err=>console.log(err));


//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'))


app.listen(3000,console.log(`Server is working fine on ${3000}`));