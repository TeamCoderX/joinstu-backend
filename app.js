const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

require('dotenv').config();
//session
const session = require('express-session');
const MongoDBStore = require('express-mongodb-session')(session);
const mongoURI = process.env.MONGO_URI
const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'Sessions'
});
store.on('error', function(error) {
  console.log(error);
});
app.use(session({
  secret: (process.env.NODE_ENV=='production') ? Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) : 'join',
  name: 'joinstu session',
  saveUninitialized: true,
  resave: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}))

//cors
if(process.env.NODE_ENV != 'production'){
  app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
  });
  const cors = require('cors');
  app.use(cors({
      origin:['http://127.0.0.1:8080'],
      credentials: true,
      methods:['GET','POST','OPTIONS'],
  }));
  app.options('*', cors());
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const accountRouter = require('./routes/accounts');
const forumRouter = require('./routes/forum');
const proposeRouter = require('./routes/propose');
const profileRouter = require('./routes/profile');
const adminRouter = require('./routes/admin');
const dataRouter = require('./routes/data');
const oauthRouter = require('./routes/oauth');

//logger
app.set('trust proxy', true);
if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'dev-ssl'){
  app.use((req, res, next)=>{
    console.log(`{ ${req.ip} , ${new Date().toLocaleString()}], method:[${req.method}], url:[${req.url} }`);
    next();
  })
}

app.use('/api/accounts',accountRouter)
app.use('/api/profile',profileRouter)
app.use('/api/forum',forumRouter)
app.use('/api/propose',proposeRouter)
app.use('/api/admin',adminRouter)
app.use('/api/data',dataRouter)
app.use('/api/auth',oauthRouter)


//history
const history = require('connect-history-api-fallback');
app.use('/', express.static(path.join(__dirname, 'dist/index')));
app.use('/admin', express.static(path.join(__dirname, 'dist/admin')));
app.use(history({
  disableDotRule: true,
  verbose: true,
  rewrites: [
    {
      from: /^\/api\/.*$/,
      to: (context)=>{
          return context.parsedUrl.path
      }
    },
  ]
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err.status == 404){
    res.sendStatus(404);
  }
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
