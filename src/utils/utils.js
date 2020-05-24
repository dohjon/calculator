import fs from 'fs';
import { resolve } from 'path';

/**
 * Test for any occurences of newlines
 * @type {RegExp}
 * */
export const newlines = /\n/g;

/**
 * Prints to stdout with newline.
 * @param {*} [message='']
 * @return {void}
 */
export function logger(message = ``) {
  // eslint-disable-next-line no-console
  console.log(message);
}

/**
 * Returns user supplied command line arguments
 * @param {string} message
 * @return {string[]}
 */
export function parseCommandLineArguments() {
  // eslint-disable-next-line no-unused-vars
  const [execPath, execFile, ...commandLineArguments] = process.argv;
  return commandLineArguments;
}

/**
 * Check if passed in value is numeric
 * @param {(number|string)} value
 * @return {boolean}
 */
export function isNumeric(value) {
  return !isNaN(value);
}

/**
 * Read and return the entire contents of the file.
 * @param {string} path
 * @return {string}
 */
export function readFile(path) {
  const file = resolve(process.cwd(), path);

  // Assumption: no need to optimize by using steams (read file content into memory)
  try {
    const data = fs.readFileSync(file, 'utf8');

    return data;
  } catch (error) {
    if (error.code === 'ENOENT') {
      logger('File not found!');
    } else {
      throw error;
    }
  }
}
