var express = require('express');
var router = express.Router();
var { client, auth } = require('../lib/dbutils');

function appendNewForumData(req) {
    var randomURL = (Math.random() + 1).toString(10).substring(7);
    client.db('main').collection('forum').findOne({ randomURL: randomURL }, (err, result) => {
        if (err) throw err;
        if (result == null) {
            client.db('main').collection('forum').insertOne({
                url: randomURL,
                title: req.body.title,
                contents: req.body.contents,
                date: new Date,
                author: req.session.user
            })
            client.db('forums-comment-support').createCollection(randomURL, (err) => {
                if (err) throw err;
            })            
            client.db('forums-comment-else').createCollection(randomURL, (err) => {
                if (err) throw err;
            })
            return false
        } else {
            return true
        }
    })
}

router.get('/comments/:id', (req, res) => {
    const id = req.params.id.toString()
    try {
        client.connect()
        client.db('forums-comment-support').collection(id).find().sort({date: -1}).toArray((err, supportData) => {
            if (err) throw err;
            client.db('forums-comment-else').collection(id).find().sort({date: -1}).toArray((err, elseData) => {
                if (err) throw err;
                res.json({support:supportData, else:elseData})
            })
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/details/:id', (req, res) => {
    const id = req.params.id.toString()
    try {
        client.db('main').collection('forum').findOne({ url: id }, (err, cardData) => {
            if (err) throw err;
            res.json(cardData)
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/list', (req, res) => {
    const ItemsPerPage = 6;
    const page = req.body.page;
    try {
        client.db('main').collection('forum').find().sort({ date: -1 }).toArray((err, data) => {
            if (err) throw err;
            if(data.length < ItemsPerPage || page==undefined){
                res.json({pages: 1, data: data});
            }else{
                res.json({pages: Math.ceil((data.length)/ItemsPerPage), data:data.slice((page-1)*ItemsPerPage, page*ItemsPerPage)});
            }
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/new', auth, (req, res) => {
    try {
        if(req.body.title != "" && req.body.contents != ""){
            while (appendNewForumData(req)) {
                appendNewForumData(req)
            }
            res.json({status: true})
        }else{
            res.json({status: false})
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})
// router.get('/commentAuth',)
router.post('/commentSupport/:id', auth, (req, res) => {    
    const id = req.params.id
    let user = req.session.user
    if(req.body.contents != ""){
        try {
            client.db('forums-comment-support').collection(id).insertOne({
                author: user,
                contents: req.body.contents,
                date: new Date
            }, (err) => {
                if (err) throw err;
            })
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
})

router.post('/commentElse/:id', auth, (req, res) => {     
    const id = req.params.id
    let user = req.session.user
    if(req.body.contents != ""){
        try {
            client.db('forums-comment-else').collection(id).insertOne({
                author: user,
                contents: req.body.contents,
                date: new Date
            }, (err) => {
                if (err) throw err;
            })
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
})



module.exports = router;