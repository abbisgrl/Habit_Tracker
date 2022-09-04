const express = require('express');
const router = express.Router();

//importing the User models
const User = require('../models/Users');

//it will redirect to the login page 
router.get('/login',(req,res)=>res.render('login'));

//it will redirect to the register page
router.get('/register',(req,res)=>res.render('register'));

//it will take input from the register page and register in database
router.post('/register',(req,res)=>{
    const {name,email} = req.body;
    let errors = [];
    if(!name || !email){
        errors.push({msg:'Please enter all details'});
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email
        });
    }else{
        User.findOne({email:email}).then(user=>{
            if(user){
                errors.push({msg:'Email id already exist'})
                res.render('register',{
                    errors,
                    name,
                    email
                });
            }else{
                const newUser = new User({
                    name,
                    email
                });

                newUser 
                .save()
                .then(user=>{
                    req.flash(
                        'success_message',
                        'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                })
                .catch(err=>console.log(err));
            }
            
        });
    }
});

//it will take the input from the login page and check in the database and show the dashboard according 
//with that
router.post('/login',(req,res)=>{
    const {email} = req.body;

    User.findOne({
        email:email
    }).then(user=>{
        if(!user){
            let errors = [];
            errors.push({msg:'This email is not register'});
            res.render('login',{
                errors,
                name,
                email
            });
        }else{
            res.redirect(`/dashboard?user=${user.email}`);
        }
    });
});

//router for logout 
router.get('/logout',(req,res)=>{
    req.flash('success_message','You are logged out');
    res.redirect('/users/login');
});

module.exports = router;