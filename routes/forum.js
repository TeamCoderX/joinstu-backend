var express = require('express');
var router = express.Router();
var { client, auth, generateNewId } = require('../lib/dbutils');

router.get('/comments/:id', (req, res) => {
    const id = req.params.id.toString()
    try {
        client.connect()
        client.db('forums-comment-support').collection(id).find().sort({ date: -1 }).toArray((err, supportData) => {
            if (err) throw err;
            client.db('forums-comment-else').collection(id).find().sort({ date: -1 }).toArray((err, elseData) => {
                if (err) throw err;
                res.json({ support: supportData, else: elseData })
            })
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/details/:id', (req, res) => {
    const id = req.params.id.toString()
    try {
        client.db('main').collection('forum').findOne({ id: id }, (err, cardData) => {
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
            if (data.length < ItemsPerPage || page == undefined) {
                res.json({ pages: 1, data: data });
            } else {
                res.json({ pages: Math.ceil((data.length) / ItemsPerPage), data: data.slice((page - 1) * ItemsPerPage, page * ItemsPerPage) });
            }
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/new', auth, (req, res) => {
    var user = req.session.user;
    var forumID = generateNewId('main', 'forum')
    try {
        if (req.body.title != "" && req.body.contents != "") {
            client.db('main').collection('forum').insertOne({
                id: forumID,
                title: req.body.title,
                contents: req.body.contents,
                date: new Date,
                author: req.session.user
            })
            client.db('main').collection('accounts').updateOne({ id: user }, { $push: { addedForums: forumID } });
            res.json({ status: true });
        } else {
            res.json({ status: false, reason: 'data-empty' });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/commentSupport/:id', auth, (req, res) => {
    const id = req.params.id
    let user = req.session.user
    if (req.body.contents != "") {
        try {
            client.db('forums-comment-support').collection(id).insertOne({
                id: generateNewId('forums-comment-support', id),
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
    if (req.body.contents != "") {
        try {
            client.db('forums-comment-else').collection(id).insertOne({
                id: generateNewId('forums-comment-support', id),
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