const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
 
const db = require('./config/keys').MongoURI;

//connect to the mongodb 
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connected to mongoDB "))
.catch(err=>console.log(err));

app.use(expressLayouts);
app.use('/assets',express.static('./assets'));
app.set('view engine','ejs');

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


app.use(flash());
app.use(function(req,res,next){
    res.locals.success_message= req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


app.listen(3000,console.log(`Server is working fine on ${3000}`));