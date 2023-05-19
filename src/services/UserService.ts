import { IUser, UserRoles } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { dbClient } from '@src/util/DBUtil';
import { getHash } from '@src/util/PwdUtil';
import { Filter, Sort, WithId } from 'mongodb';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
export async function findUsers(find_pattern: any, sort?: Sort): Promise<Array<any>> {
  return await new Promise((resolve, reject) => {
    dbClient.db('main').collection('accounts').find(find_pattern).sort((sort ?? { joindate: -1 })).toArray()
      .then((result: Array<any>) => {
        resolve(result);
      })
      .catch((err: any) => {
        reject(err);
      })
  })
}

/**
 * Get an Unique Account.
 */
export async function findOneUser(find_pattern: any): Promise<any> {
  return await new Promise((resolve, reject) => {
    dbClient.db('main').collection('accounts').findOne(find_pattern)
      .then((result) => {
        resolve(result);
      })
      .catch((err: any) => {
        reject(err);
      })
  })
}

/**
 * Add one user.
 */
export async function createUser(id: string, school: string, password: string, email: string, username: string, role: IUser, isBanned?: boolean): Promise<IUser> {
  return await new Promise((resolve, reject) => {
    getHash(password)
      .then((pwdhash: any) => {
        dbClient.db('main').collection('accounts').insertOne({
          id,
          pwdhash: pwdhash.toString(),
          email,
          school,
          username,
          joindate: new Date(),
          supportedProposes: [],
          addedProposes: [],
          commentedSupportForums: [],
          addedForums: [],
          role,
          isBanned: (isBanned ?? false),
          isDeleted: false,
        })
      })
    dbClient.db('main').collection('accounts').insertOne({
      id: id,
      school: school,
      pwdHash: password,
      email: email,
      name: name,
      isBanned: isBanned,
      isDeleted: false,
    }).then((result: any) => {
      resolve(result.ops[0]);
    })
  })
}

/**
 * Update one user.
 */
export async function updateUser(id: string, school?:string, password?:string, name?:string): Promise<void> {
  return await new Promise((resolve, reject) => {
    findUsers({ id: id })
      .then((result: any) => {
        dbClient.db('main').collection('accounts').updateOne({ id: id },{$set: {school: school, pwdHash: password, name: name}})
      })
  })
}

/**
 * Delete a user by their id.
 */

// **** Export Default **** //
export default {
  findUsers,
  findOneUser,
  createUser,
  updateUser,
} as const;