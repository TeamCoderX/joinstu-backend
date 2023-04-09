const { MongoClient } = require('mongodb');
require('dotenv').config();
//mongodb connection client
const mongoURI = process.env.MONGO_URI;
const dbclient = new MongoClient(mongoURI);

// unique id generator
const generateNewId = (db, collection) => {
  let randomID = (Math.random() + 1).toString(10).substring(7);
  dbclient.db(db).collection(collection).findOne({ id: randomID }, (err, result)=>{
    if (err) reject(err);
    console.log(randomID, result)
    if (result != null) {
      randomID = generateNewId(db, collection);
    }
  })
  return randomID;
}

//password encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passwordGenHash = (password) => {
  const hashHandler = new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    })
  })
  return hashHandler;
}
const passwordCheckHash = (password, hash) => {
  const hashHandler = new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
  return hashHandler;
}

//session auth
const authfunc = (req, res, next) => {
  if (req.session.user) {
    try {
      dbclient.db('main').collection('accounts').findOne({ id: req.session.user }, (err, data) => {
        if (err) throw err;
        if (!data.isAdmin) {
          next();
        } else {
          res.sendStatus(403);
        }
      })
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
}
const authAdmin = (req, res, next) => {
  if (req.session.user) {
    try {
      dbclient.db('main').collection('accounts').findOne({ id: req.session.user }, (err, data) => {
        if (err) throw err;
        if (data.isAdmin) {
          next();
        } else {
          res.sendStatus(403);
        }
      })
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
}
const auth = (req, res, next) => {
  if (req.session.user) {
    try {
      dbclient.db('main').collection('accounts').findOne({ id: req.session.user }, (err, data) => {
        if (err) throw err;
        if (data.isAdmin == false) {
          next();
        } else {
          res.sendStatus(401);
        }
      })
    } catch (err) {
      console.log(err);
    }
  } else {
    res.sendStatus(403);
  }
}
const authAll = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(403);
  }
}
// exports
module.exports = {
  client: dbclient,
  authAdm: authAdmin,
  authAll: authAll,
  auth: auth,
  passwordEncryption: {
    gen: passwordGenHash,
    check: passwordCheckHash,
  },
  generateNewId: generateNewId,
}