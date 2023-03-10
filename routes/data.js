var express = require('express');
var router = express.Router();
var { client, auth, passwordEncryption } = require('../lib/dbutils')

router.post('/getUser', (req, res) => {
    const userId = req.body.id;
    try {
        client.db('main').collection('accounts').findOne({ id: userId }, (err, data) => {
            if (err) throw err;
            if (data == null) {
                res.json({ name: null })
            } else {
                res.json({ name: data.name })
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/getSchool',(req,res)=>{
    const schoolId = req.body.id;
    try {
        client.db('main').collection('schools').findOne({ id: schoolId },(err,data)=>{
            if(err) throw err;
            if(data == null){
                res.json({name:null});
            }else{
                res.json({name:data.schoolName});
            }
        })
    }catch(err){
        console.log(err);
    }
})

router.post('/getTitle/propose',(req,res)=>{
    const id = req.body.id;
    try {
        client.db('main').collection('propose').findOne({url: id},(err,data)=>{
            if(err) throw err;
            if(data == null){
                res.json({title:null});
            }else{
                res.json({title:data.title});
            }
        })
    }catch(err){
        console.log(err)
    }
})


module.exports = router;