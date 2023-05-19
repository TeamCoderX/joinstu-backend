import bcrypt from 'bcrypt';


// **** Variables **** //

const SALT_ROUNDS = 12;


// **** Functions **** //

/**
 * Get a hash from the password.
 */
export function getHash(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

/**
 * Useful for testing.
 */
function hashSync(pwd: string): string {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

/**
 * See if a password passes the hash.
 */
export function compare(pwd: string, hash: string): Promise<boolean> {
  // console.log({pwd: pwd, hash: hash});
  return bcrypt.compare(pwd, hash);
}

// **** Export Default **** //
export default {
  getHash,
  hashSync,
  compare,
} as const;
