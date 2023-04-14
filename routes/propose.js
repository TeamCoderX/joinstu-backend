const express = require('express');
const router = express.Router();
const { client, auth, generateNewId } = require('../lib/dbutils');

router.get('/comments/:id', (req, res) => {
    const id = req.params.id.toString()
    try {
        client.connect()
        client.db('proposes-comment-support').collection(id).find().sort({ date: -1 }).toArray((err, supportData) => {
            if (err) throw err;
            client.db('proposes-comment-else').collection(id).find().sort({ date: -1 }).toArray((err, elseData) => {
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
        client.db('main').collection('propose').findOne({ id: id }, (err, data) => {
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
            if (data.length < ItemsPerPage || page == undefined) {
                res.json({ pages: 1, data: data });
            } else {
                res.json({ pages: Math.ceil((data.length) / ItemsPerPage), data: data.slice((page - 1) * ItemsPerPage, page * ItemsPerPage) });
            }
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/support/:id', auth, (req, res) => {
    const user = req.session.user;
    const proposeID = req.params.id;
    try {
        client.db('proposes').collection(proposeID).find({ student_id: user }).toArray((err, result) => {
            if (err) throw err;
            if (result[0] == undefined) {
                client.db('proposes').collection(proposeID).insertOne({ student_id: user }, () => {
                    if (err) throw err;
                    client.db('main').collection('propose').updateOne({ id: proposeID }, { $inc: { num: 1 } });
                    client.db('main').collection('accounts').updateOne({ id: user }, { $push: { supportedProposes: proposeID } });
                })
                res.json({ status: true })
            } else {
                res.json({ status: false })
            }
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.get('/supportStatus/:id', auth, (req, res) => {
    const user = req.session.user;
    const proposeID = req.params.id
    try {
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
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/new', auth, (req, res) => {
    const user = req.session.user;
    const proposeID = generateNewId('main', 'propose');
    try {
        if (req.body.title != "" && req.body.details != "" && req.body.purpose != "") {
            client.db('main').collection('propose').insertOne({
                id: proposeID,
                title: req.body.title,
                details: req.body.details,
                purpose: req.body.purpose,
                proposer: req.session.user,
                date: new Date,
                num: 0
            })
            client.db('main').collection('accounts').updateOne({ id: user }, { $push: { addedProposes: proposeID } });
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
    const user = req.session.user
    if (req.body.contents != "") {
        try {
            client.db('proposes-comment-support').collection(id).insertOne({
                id: generateNewId('proposes-comment-support', id),
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
    if (req.body.contents != "") {
        try {
            client.db('proposes-comment-else').collection(id).insertOne({
                id: generateNewId('proposes-comment-support', id),
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