/**
 * Grammar rule for quit
 *
 *  ^       Start of the string
 *  $       End of the string
 *
 * @type {string} - String containing a regex
 */
export const quit = `^quit$`;

/**
 * Grammar rule for print
 *
 *  ^       Start of the string
 *  $       End of the string
 *
 * @type {string} - String containing a regex
 */
export const print = `^print$`;

/**
 * Grammar rule for operation(s)
 *
 *  ^       Start of the string
 *  |       Match prev or next
 *  $       End of the string
 *
 * @type {string} - String containing a regex
 */
export const operation = `^add$|^subtract$|^multiply$`;

/**
 * Grammar rule for register(s)
 *
 *  ^       Start of the string
 *  (?!     Start of negative lookahead
 *  |       Match prev or next
 *  \d      digit
 *  $       End of the string
 *  )       End of negative lookahead
 *  [a-z\d] character between a & z or digit
 *  +       1 or more time(s)
 *  $       End of the string
 *
 * @type {string} - String containing a regex
 */
export const register = `^(?!${operation}|${quit}|${print}|\\d$)[a-z\\d]+$`;

/**
 * Grammar rule for value(s)
 *
 *  ^       Start of the string
 *  -       Match hyphen
 *  ?       0 or 1 time(s)
 *  [0-9]   Match a digit 0-9
 *  +       1 or more time(s)
 *  $       End of the string
 *
 * @type {string} - String containing a regex
 */
export const value = `^-?[0-9]+$|${register}`;

/**
 * Check if token matches rule
 * @param {string} [token='']
 * @param {string} [rule='']
 * @example
 * isToken(`x`, register) // returns true
 * @returns {boolean}
 */
export function isToken(token = ``, rule = ``) {
  const regex = new RegExp(`${rule}`, `i`);
  return regex.test(token);
}
