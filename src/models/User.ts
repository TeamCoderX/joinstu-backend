// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an ' + 
  'object with the appropriate user keys.';

export enum UserRoles {
  Student,
  Admin,
}


// **** Types **** //

export interface IUser {
  id: string,
  pwdHash: string,
  email: string,
  school: string,
  username: string,
  joindate: Date,
  supportedProposes: string[],
  addedProposes: string[],
  commentedSupportForums: string[],
  addedForums: string[],
  role: UserRoles,
  isBanned: boolean,
  isDeleted: boolean,
}

export interface ISessionUser {
  id: string;
  username: string;
  role: IUser['role'];
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  id: string,
  pwdHash: string,
  school: string,
  username: string,
  email: string,
  role: UserRoles,
): IUser {
  return {
    id,
    pwdHash,
    school,
    username: username,
    email: email,
    role: role,
    joindate: new Date(),
    supportedProposes: [],
    addedProposes: [],
    commentedSupportForums: [],
    addedForums: [],
    isBanned: false,
    isDeleted: false,
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IUser {
  // Check is user
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  // Get user instance
  const p = param as IUser;
  return new_(
    p.id,
    p.pwdHash,
    p.school,
    p.username,
    p.email,
    p.role,
  )
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    'email' in arg &&
    'name' in arg &&
    'role' in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const;
