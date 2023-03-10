var express = require('express');
var router = express.Router();
var { client, auth } = require('../lib/dbutils');

router.get('/comments/:id', (req, res) => {
    const id = req.params.id.toString()
    try {
        client.connect()
        client.db('proposes-comment-support').collection(id).find().sort({date: -1}).toArray((err, supportData) => {
            if (err) throw err;
            client.db('proposes-comment-else').collection(id).find().sort({date: -1}).toArray((err, elseData) => {
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
        client.db('main').collection('propose').findOne({ url: id }, (err, data) => {
            res.json(data)
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/list', (req, res) => {
    const ItemsPerPage = 6;
    const page = req.body.page;
    try {
        client.db('main').collection('propose').find().sort({ date: -1 }).toArray((err, data) => {
            if (err) throw err;
            if(data.length < ItemsPerPage || page==undefined){
                res.json({pages: 1, data: data});
            }else{
                res.json({pages: Math.ceil((data.length)/ItemsPerPage), data:data.slice((page-1)*ItemsPerPage, page*ItemsPerPage)});
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/support/:id', auth, (req, res) => {
    var user = req.session.user;
    var proposeID = req.params.id;
    try {
        client.db('proposes').collection(proposeID).find({ student_id: user }).toArray((err, result) => {
            if (err) throw err;
            if (result[0] == undefined) {
                client.db('proposes').collection(proposeID).insertOne({ student_id: user }, () => {
                    if (err) throw err;
                    client.db('main').collection('propose').updateOne({ url: proposeID }, { $inc: { num: 1 } });
                    client.db('main').collection('accounts').updateOne({ id: user }, { $push: { supportedProposes: proposeID } });
                })
                res.json({ status: true })
            }else {
                res.json({ status: false })
            }
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.get('/supportStatus/:id', auth, (req, res) => {
    var user = req.session.user
    var proposeID = req.params.id
    try{
        client.db('main').collection('accounts').findOne({ id: user }, (err, data) => {
            if (err) throw err;
            if (data != null) {
                if (data.supportedProposes.includes(proposeID)) {
                    res.json({ status: true })
                } else {
                    res.json({ status: false })
                }
            } else {
                res.sendStatus(404)
            }
        })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }    
})

function appendData(req) {
    var randomURL = (Math.random() + 1).toString(10).substring(7);

    client.db('main').collection('propose').findOne({ randomURL: randomURL }, (err, result) => {
        if (err) throw err;
        if (result == null) {
            client.db('main').collection('propose').insertOne({
                url: randomURL,
                title: req.body.title,
                details: req.body.details,
                purpose: req.body.purpose,
                proposer: req.session.user,
                date: new Date,
                num: 0
            })
            client.db('main').collection('accounts').updateOne({ id: (req.session.user) }, { $push: { addedProposes: randomURL } });
        } else {
            return true;
        }
    })
}

router.post('/new', auth, (req, res) => {
    try {
        if(req.body.title == "" || req.body.details == "" || req.body.purpose == ""){
            while (appendData(req)) {
                appendData(req);
            }
            res.json({ status: true });
        }else{
            res.json({ status: false });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/commentSupport/:id', auth, (req, res) => {    
    const id = req.params.id
    let user = req.session.user
    if(req.body.contents != ""){
        try {
            client.db('proposes-comment-support').collection(id).insertOne({
                author: user,
                contents: req.body.contents,
                date: new Date
            }, (err) => {
                if (err) throw err;
            })
            res.sendStatus(200);
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
            client.db('proposes-comment-else').collection(id).insertOne({
                author: user,
                contents: req.body.contents,
                date: new Date
            }, (err) => {
                if (err) throw err;
            })
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
})

module.exports = router;