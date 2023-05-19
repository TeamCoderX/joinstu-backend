import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';


// **** Session **** //

import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

const mongoURI = process.env.MONGO_URI
const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 24 * 7,
  
})
store.on('error', (error: any)=>{
  console.log(error);
});
server.use(session({
  secret: (process.env.NODE_ENV=='production') ? Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) : 'join',
  name: 'joinstu session',
  saveUninitialized: true,
  resave: true,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}))



// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
