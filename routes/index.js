const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const Habit = require('../models/Habit');


router.get('/', (req, res) => res.render('welcome'));

var email = "";

router.get('/dashboard', (req, res) => {
    email = req.query.user;
    User.findOne({
        email: req.query.user
    }).then(user => {
        Habit.find({
            email: req.query.user
        }, (err, habits) => {
            if (err) {
                console.log(err);
            } else {
                var days = [];
                days.push(getDays(0));
                days.push(getDays(1));
                days.push(getDays(2));
                days.push(getDays(3));
                days.push(getDays(4));
                days.push(getDays(5));
                days.push(getDays(6));
                res.render('dashboard', { habits, user, days });
            }
        });
    });
});

function getDays(n) {
    let d = newDate();
    var newDate = d.toLocaleDateString('pr-br').split('/').reverse().join('-');
    var day;
    switch (d.getDay()) {
        case 0: day = 'Sun';
            break;
        case 1: day = 'Mon';
            break;
        case 2: day = 'Tue';
            break;
        case 3: day = 'Wed';
            break;
        case 4: day = 'Thu';
            break;
        case 5: day = 'Fri';
            break;
        case 6: day = 'Sat';
            break;
    }
    return {data:newDate,day};
}

router.post('/user-view',(req,res)=>{
    User.findOne({
        email
    })
    .then(user=>{
        user.view = user.view ==='daily'?'weekly':'daily';
        user.save()
        .then(user=>{
            return res.redirect('back');
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>{
        console.log("Error changing view");
        return ;
    })
})


router.post('/dashboard',(req,res)=>{
    const{content} = req.body;

    Habit.findOne({content:content,email:email}).then(habit=>{
        if(habit){
            let dates = habit.dates,tzoffset = (new Date()).getTimezoneOffset()*60000;
            var today = (new Date(Date.now()-tzoffset)).toISOString().slice(0,10);
            dates.find(function(item,index){
                if(item.date===today){
                    console.log("Habit Exists")
                    req.flash(
                        'error_msg',
                        'Habit exists!'
                    );
                    res.redirect('back');
                }else{
                    dates.push({ date: today, complete: 'none' });
                    habit.dates = dates;
                    habit.save()
                        .then(habit => {
                            console.log(habit);
                            res.redirect('back');
                        })
                        .catch(err => console.log(err));
                }
            });
        }else{ 
            let dates = [], tzoffset = (new Date()).getTimezoneOffset() * 60000;
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete: 'none' });
            const newHabit = new Habit({
                content,
                email,
                dates
            });

            newHabit
                .save()
                .then(habit => {
                    console.log(habit);
                    res.redirect('back');
                })
                .catch(err => console.log(err));
        }
    });
});


router.get('/favorite-habit',(req,res)=>{
    let id = req.query.id;
    Habit.findOne({
        _id:{
            $in:[
                id
            ]
        },
        email
    })
    .then(habit=>{
        habit.favorite= habit.favorite?false:true;
        habit.save()
        .then(habit=>{
            req.flash(
                'Added to favorite',
                habit.favorite?'Habit added to favorites':'Habit removed from Favorites'
            );
            return res.redirect('back');
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>{
        console.log("error adding to your favorites!");
        return;
    });
});

router.get('/status-update',(req,res)=>{
    var d = req.query.date;
    var id = req.query.id;
    Habit.findById(id,(err,habit)=>{
        if(err){
            console.log('Error in updating')
        }
        else{
            let dates = habit.dates;
            let found = false;
            dates.find(function(item,index){
                if(item.date===d){
                    if(item.complete==='yes'){
                        item.complete = 'no';
                    }
                    else if(item.complete ==='no'){
                        item.complete = 'none'
                    }else if(item.complete==='none'){
                        item.complete = 'yes';
                    }
                    found = true;
                }
            })
            if(!found){
                dates.push({date:d,complete:'yes'})
            }
            habit.dates =dates;
            habit.save()
            .then(habit=>{
                console.log(habit);
                res.redirect('back');
            })
            .catch(err=>console.log(err));
        }
    });
});

router.get('/remove',(req,res)=>{
    let id = req.query.id;
    Habit.deleteMany({
        _id:{
            $in:[
                id
            ]
        },
        email
    },(err)=>{
        if(err){
            console.log('Error in deleting the record');
        }else{
            req.flash(
                'success_message',
                'Record deleted succefully'
            )
            return res.redirect('back');
        }
    })
});

module.exports = router;