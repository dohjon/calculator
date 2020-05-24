import { newlines } from '../utils/utils.js';

/**
 * Divide input string into a list of tokens (Lexical Analysis).
 * @param {string} [input='']
 * @example
 * // returns [`x`,`y`]
 * scan(`x y`)
 * @returns {string[]}
 */
export function scan(input = ``) {
  return input
    .trim()
    .replace(newlines, ' ')
    .split(' ')
    .filter((token) => token.length)
    .map((token) => token.toUpperCase());
}
