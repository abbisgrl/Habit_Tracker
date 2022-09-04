const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const app = express();
 
const db = require('./config/keys').MongoURI;

//connect to the mongodb 
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected to mongoDB "))
.catch(err=>console.log(err));

app.use(expressLayouts);
app.set('view engine','ejs');

//Routes
app.use('/',require('./models/Habit'));
app.use('/users',require('./models/Users'))


app.listen(3000,console.log(`Server is working fine on ${3000}`));