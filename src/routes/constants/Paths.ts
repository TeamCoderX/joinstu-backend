/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',
  Auth: {
    Base: '/accounts',
    Login: '/login',
    Logout: '/logout',
  },
  Data: {
    Base: '/data',
    GetSchool: '/get-school',
    GetUser: '/get-user',
    GetTitle: '/get-title',
  },
  OAuth: {
    Base: '/oauth',
    Login: '/login',
    Callback: '/callback',
  },
  Profile: {
    Base: '/profile',
    GetIndex: '/index',
    ReIDCookie: '/re-id-cookie',
    PasswordChange: '/password-change',
  },
  Propose: {
    Base: '/propose',
    GetList: '/list',
    New: '/new',
    Support: '/support/:id',
    Comment: '/comment/:id',
  },
  Forum: {
    Base: '/forum',
    GetList: '/list',
    New: '/new/:id',
    Comment: '/comment/:id',
  }
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
