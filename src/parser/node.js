export const REGISTER = Symbol('register');
export const OPERATION = Symbol('operation');
export const VALUE = Symbol('value');
export const INVALID = Symbol('invalid');
export const PRINT = Symbol('print');
export const QUIT = Symbol('quit');

/**
 * @typedef Node
 * @type {object}
 * @property {string} val
 * @property {string} type
 * @property {Node[]} children
 */

/**
 * Create new Node
 * @param {number} val
 * @param {symbol} type
 * @param {Node[]} children
 * @returns {Node}
 */
export function createNode(val, type, children) {
  return { val, type, children };
}
