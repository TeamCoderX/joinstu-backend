var express = require('express');
var router = express.Router();
var { client, passwordEncryption } = require('../lib/dbutils')

router.post('/login', (req, res) => {
    const id = req.body.account
    const password = req.body.password
    client.db('main').collection('accounts').findOne({ id: id }, (err, data) => {
        if (data != null) {
            if (data.isBanned == true) {
                res.json({ status: false, reason: 'banned' });
            } else if(data.isDeleted == true){
                res.json({ status: false, reason: 'data-incorrect' })
            } else {
                if(data.password != null){
                    passwordEncryption.check(password, data.password).then((result) => {
                        if (result) {
                            req.session.user = data.id
                            res.cookie('joinstu_username', data.name, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
                            res.cookie('joinstu_userid', data.id, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
                            res.json({ status: true })
                        } else {
                            res.json({ status: false, reason: 'data-incorrect' })
                        }
                    }).catch((err) => {
                            console.log(err);
                    })
                }else{
                    res.json({ status: false, reason: 'data-incorrect' })
                }
            }
        }else {
            res.json({ status: false, reason: 'data-incorrect' })
        }
    })
})

router.post('/status', (req, res) => {
    if (req.session.user) {
        try {
            client.db('main').collection('accounts').findOne({ id: req.session.user }, (err, data) => {
                if (err) throw err;
                if (!data.isAdmin) {
                    res.json({ status: true, isAdmin: false })
                } else {
                    res.json({ status: true, isAdmin: true })
                }
            })
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        res.json({ status: false })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('joinstu_username');
    res.clearCookie('joinstu_userid');
    res.redirect('/')
})

module.exports = router;