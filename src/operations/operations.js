/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {
  return a + b;
}

/**
 * Subtract two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function subtract(a, b) {
  return a - b;
}

/**
 * Multiply two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function multiply(a, b) {
  return a * b;
}

/**
 * Operation handlers
 * @type {Object}
 * @property {function} add
 * @property {function} subtract
 * @property {function} multiply
 */
export const operations = {
  add: add,
  subtract: subtract,
  multiply: multiply,
};

/**
 * Get and call the operation handler.
 * @param {*} a Left hand side value
 * @param {*} operation Operation
 * @param {*} b Right hand side value
 * @example
 * doCalculation(1, add, 2)
 * @returns {number} Returns the result of the equation.
 */
export function doCalculation(a, operation, b) {
  const handler = operations[operation.toLowerCase()];
  if (!handler) throw new Error('Invalid operation');
  return handler(a, b);
}
