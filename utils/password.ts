// utils/password.js
import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * Salts and hashes the given password.
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - The hashed password.
 */
export async function saltAndHashPassword(password: any): Promise<string>{
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} password - The plain text password to be compared.
 * @param {string} hash - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
async function comparePassword(password: any, hash: any): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

module.exports = {
  saltAndHashPassword,
  comparePassword,
};
