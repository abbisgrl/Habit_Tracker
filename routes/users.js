const express = require('express');
const router = express.Router();

const User = require('../models/Users');

router.get('/login',(req,res)=>res.render('login'));

router.get('/register',(req,res)=>res.render('register'));

// router.get('/regis')