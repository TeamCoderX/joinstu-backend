var express = require('express');
var router = express.Router();
var dbclient = require('../lib/dbutils').client;

const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const redirectTo = (process.env.NODE_ENV === 'production') ? process.env.OAUTH_CALLBACK : process.env.OAUTH_CALLBACK_DEV;

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(clientID, clientSecret, redirectTo);

const { google } = require('googleapis');
const oauth2 = google.oauth2({
  version: 'v2',
  auth: client
});


router.get('/google/login', (req, res) => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  });
  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
    const { data } = await oauth2.userinfo.get();
    const { id, email, name, hd } = data;
    let school = '';
    switch (hd) {
      case 'stu.tshs.tp.edu.tw':
        school = '381301';
        break;
      default:
        res.redirect('/#/propose?login_alert=domain-wrong')
        return;
    }
    dbclient.db('main').collection('accounts').findOne({ id: id.toString() }, (err, data) => {
      if (data == null) {
        // create user
        const password = null;
        const joindate = new Date();
        const supportedProposes = [];
        const addedProposes = [];
        const commentedSupportForums = [];
        const addedForums = [];
        const isAdmin = false;
        const isBanned = false;
        const isDeleted = false;
        try {
          dbclient.db('main').collection('accounts').insertOne({ id, password, school, name, joindate, supportedProposes, addedProposes, commentedSupportForums, addedForums, isAdmin, isBanned, isDeleted });
          req.session.user = id;
          res.cookie('joinstu_username', name, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
          res.cookie('joinstu_userid', id, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
          res.redirect('/');
        } catch (err) {
          console.log(err);
          res.sendStatus(500);
        }
      } else {
        if (data.isBanned == true) {
          res.redirect('/#/propose?login_alert=banned')
        } else if (data.isDeleted == true) {
          res.redirect('/#/propose?login_alert=notfound')
        } else {
          // login
          req.session.user = data.id;
          res.cookie('joinstu_userid', data.id, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
          if (data.name != name) {
            dbclient.db('main').collection('accounts').updateOne({ id: data.id }, { $set: { name: name } });
            res.cookie('joinstu_username', name, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
          } else {
            res.cookie('joinstu_username', data.name, { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 7 })
          }
          if (data.email != email) {
            dbclient.db('main').collection('accounts').updateOne({ id: data.id }, { $set: { email: email } });
          }
          res.redirect('/');
        }
      }
    })
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;