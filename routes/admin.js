const express = require('express');
const router = express.Router();
const { client, auth, passwordEncryption } = require('../lib/dbutils')

router.get('/getUsers',  (req,res)=>{
    try{
        client.db('main').collection('accounts').find().toArray((err, data)=>{
            res.json(data);
        })
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.get('/getUserData/:id',  (req,res)=>{
    const id = req.params.id;
    try{
        client.db('main').collection('accounts').findOne({ id: id },(err, data)=>{
            res.json(data);
        })
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/updateUser',  (req,res)=>{
    const id = req.body.id;
    const school = req.body.school
    const password = req.body.password;
    const name = req.body.name;
    if(password == ''){
        try {
            client.db('main').collection('accounts').updateOne({id:id.toString()},{$set:{school:school,name:name.toString()}});
            res.json({status:true});
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }        
    }else{
        try {
            passwordEncryption.gen(password)
            .then((passwordHash)=>{
                client.db('main').collection('accounts').updateOne({id:id.toString()},{$set:{password:passwordHash.toString(),school:school,name:name.toString(),isAdmin:isAdmin}});
            })
            .catch((err) => {
                console.log(err);
            })
            res.json({status:true});
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }                
    }
})

router.post('/createUser',  (req,res)=>{
    const id = req.body.id;
    const school = req.body.school
    const password = req.body.password;
    const name = req.body.name;
    const joindate = new Date();
    const supportedProposes = [];
    const addedProposes = [];
    const commentedSupportForums = [];
    const addedForums = [];
    const isAdmin = false;
    const email = '';
    const isBanned = (req.body.isBanned==undefined) ? false : req.body.isBanned;
    const isDeleted = false;
    if(id == undefined || password == undefined || name == undefined){
        res.json({status:false});
    }else{
        try {
            passwordEncryption.gen(password)
            .then((passwordHash)=>{
                client.db('main').collection('accounts').insertOne({id,password:passwordHash.toString(),school,name,joindate,email,supportedProposes, addedProposes, commentedSupportForums, addedForums, isAdmin, isBanned, isDeleted});
            })
            .catch((err) => {
                console.log(err);
            })
            res.json({status:true});
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
})

router.post('/banUser',  (req, res)=>{
    const id = req.body.id;
    try{
        client.db('main').collection('accounts').updateOne({id:id},{$set:{isBanned:true}});
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/unbanUser',  (req, res)=>{
    const id = req.body.id;
    try{
        client.db('main').collection('accounts').updateOne({id:id},{$set:{isBanned:false}});
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/deleteUser',  (req, res)=>{
    const id = req.body.id;
    try{
        client.db('main').collection('accounts').updateOne({id:id},{$set:{isDeleted:true}});
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/restoreUser',  (req, res)=>{
    const id = req.body.id;
    try{
        client.db('main').collection('accounts').updateOne({id:id},{$set:{isDeleted:false}});
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/login', (req, res) => {
    const id = req.body.account
    const password = req.body.password
    client.db('main').collection('accounts').findOne({ id: id }, (err, data) => {
        if (data != null) {
            if (data.isBanned == true) {
                res.json({ status: false, reason: 'banned' });
            } else {
                passwordEncryption.check(password, data.password).then((result) => {
                    if (result) {
                        if(data.isAdmin){
                            req.session.user = data.id;
                            res.cookie('joinstu_username', data.name, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
                            res.cookie('joinstu_userid', data.id, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
                            res.json({ status: true });
                        }else{
                            res.json({ status: false, reason: 'not-admin' });
                        }
                    } else {
                        res.json({ status: false, reason: 'data-incorrect' });
                    }
                })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        } else {
            res.json({ status: false, reason: 'data-incorrect' });
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('joinstu_username');
    res.clearCookie('joinstu_userid');
    res.redirect('/admin');
})
module.exports = router;