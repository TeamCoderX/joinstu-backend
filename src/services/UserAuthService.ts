import { findOneUser } from '@src/services/UserService';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/other/classes';
import { IUser } from '@src/models/User';
import PwdUtil from '@src/util/PwdUtil';


// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  PasswordIncorrect() {
    return `EA-0`;
  },
  EmailNotFound() {
    return `EA-1`;
  },
  NotAdmin() {
    return `EA-2`;
  },
  Banned() {
    return `EA-3`;
  },
  Deleted() {
    return `EA-4`;
  },
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(id: string, password: string): Promise<any> {
  return await new Promise((resolve, reject) => {
  findOneUser({ id: id })
    .then(async (result: IUser)=>{
      if (result) {
        if (result.isBanned) {
          reject(
            new RouteError(
              HttpStatusCodes.UNAUTHORIZED,
              Errors.Banned(),
          ));
        }
        if (result.isDeleted) {
          reject(
            new RouteError(
              HttpStatusCodes.UNAUTHORIZED,
              Errors.Deleted(),
          ));
        }
        // Check password
        const pwdPasswd = await PwdUtil.compare(password, result.pwdHash);
        if (!pwdPasswd) {
          reject(
            new RouteError(
              HttpStatusCodes.UNAUTHORIZED,
              Errors.PasswordIncorrect(),
            ));
        }
        // Return
        resolve(result);
      }
    })
  })
}


// **** Export default **** //

export default {
  login,
} as const;
