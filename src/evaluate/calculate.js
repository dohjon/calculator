import { REGISTER, OPERATION, VALUE } from '../parser/node.js';
import { getNode } from '../helpers/helpers.js';
import { isNumeric } from '../utils/utils.js';
import { doCalculation } from '../operations/operations.js';

/**
 * Calls each stored command and reduces the result of all the calculations to a single value.
 * Each command is called with the current value of all calculations.
 * @param {number} accumulator
 * @param {Function} command
 * @returns {number}
 */
export function evaluator(accumulator, command) {
  return command(accumulator);
}

/**
 * Stores each command in a function to be called and evaluated when needed.
 * @param {import('../parser/node.js').Node} printNode
 * @param {import('../parser/node.js').Node[]} ast
 * @returns {number}
 */
export function calculate(printNode, ast) {
  if (!ast.length) {
    return;
  }

  const store = {};

  for (const node of ast) {
    const register = getNode(node, REGISTER).val;
    const operation = getNode(node, OPERATION).val;
    const value = getNode(node, VALUE).val;

    // Initial value for registers in store
    if (!store[register]) {
      store[register] = [];
    }
    if (!isNumeric(value) && !store[value]) {
      store[value] = [];
    }

    // value is number
    if (isNumeric(value)) {
      const command = (x) => doCalculation(x, operation, value);
      store[register].push(command);
    }
    // value is a register
    else {
      const command = (x) => {
        // Calculate registers pointing to other registers
        const newValue = store[value].reduce(evaluator, 0);
        return doCalculation(x, operation, newValue);
      };
      store[register].push(command);
    }
  }

  const register = getNode(printNode, REGISTER).val;
  if (store[register]) {
    const result = store[register].reduce(evaluator, 0);
    return result;
  }
}
