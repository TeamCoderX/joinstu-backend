const express = require('express');
const router = express.Router();
const { client, auth, authAll, passwordEncryption } = require('../lib/dbutils')

router.get('/index', auth, (req, res) => {
    try {
        client.db('main').collection('accounts').findOne({ id: req.session.user }, (err, data) => {
            if (err) throw err;
            res.json({
                id: data.id,
                name: data.name,
                supportedProposes: data.supportedProposes,
                addedProposes: data.addedProposes,
                commentedSupportForums: data.commentedSupportForums,
                addedForums: data.addedForums,
                joindate: data.joindate,
                school: data.school
            })
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.get('/re-idcookie', authAll, (req, res) => {
    try {
        client.db('main').collection('accounts').findOne({ id: req.session.user }, (err, data) => {
            if (err) throw err;
            res.cookie('joinstu_username', data.name, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.cookie('joinstu_userid', data.id, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.json({
                id: data.id,
                name: data.name,
                school: data.school
            })
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/changepassword', authAll, (req, res) => {
    const user = req.session.user;
    const password_origin = req.body.originPassword;
    const password_new = req.body.newPassword;
    if (password_origin != undefined && password_new != undefined) {
        try {
            client.db('main').collection('accounts').findOne({ id: user }, (err, data) => {
                if (err) throw err;
                try {
                    if(data.password == null) return res.json({ status: false });
                    passwordEncryption.check(password_origin, data.password).then((result) => {
                        if (result) {
                            passwordEncryption.gen(password_new)
                                .then((passwordHash) => {
                                    client.db('main').collection('accounts').updateOne({ id: user }, { $set: { password: passwordHash } });
                                    res.json({ status: true });
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        } else {
                            res.json({ status: false })
                        }
                    })
                } catch (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
            })
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        res.json({ status: false });
    }
})

module.exports = router;