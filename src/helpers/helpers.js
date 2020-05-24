import { logger } from '../utils/utils.js';

/**
 * Checks if any Nodes in the array matches the given Node type.
 * @param {import('../parser/node.js').Node[]} nodes
 * @param {symbol} type
 * @example
 * isNodes(nodes, REGISTER)
 * @return {boolean}
 */
export function isNodes(nodes, type) {
  return nodes.some((node) => isNode(node, type));
}

/**
 * Checks if Node or any children of Node matches the given Node type.
 * @param {import('../parser/node.js').Node} node
 * @param {symbol} type
 * @example
 * isNode(node, REGISTER)
 * @return {boolean}
 */
export function isNode(node, type) {
  if (node.type.description === type.description) {
    return true;
  }

  if (node.children) {
    for (const childNode of node.children) {
      return isNode(childNode, type);
    }
  }

  return false;
}

/**
 * Checks if the Node has any children.
 * @param {import('../parser/node.js').Node} node
 * @return {boolean}
 */
export function isLeafNode(node) {
  if (node.children.length === 0) {
    return true;
  }

  return false;
}

/**
 * Returns the first Node that matches Node type or false
 * @param {import('../parser/node.js').Node} node
 * @param {symbol} type
 * @example
 * getNode(node, VALUE)
 * @return {(import('../parser/node.js').Node|boolean)}
 */
export function getNode(node, type) {
  if (node.type.description === type.description) {
    return node;
  }

  if (node.children) {
    for (const childNode of node.children) {
      return getNode(childNode, type);
    }
  }

  return false;
}

/**
 * Prints a message next to any Node or any children of the node that matches the Node type.
 * @param {import('../parser/node.js').Node} node
 * @param {symbol} type
 * @param {string} [prefix='']
 * @example
 * logNode(node, INVALID, 'invalid =>')
 * @return {void}
 */
export function logNode(node, type, prefix = ``) {
  if (node.type.description === type.description) {
    logger(`${prefix} ${node.val}`);
  }

  if (node.children) {
    for (const childNode of node.children) {
      logNode(childNode, type);
    }
  }
}

/**
 * Returns object with extra methods to easier iterate previous, current and next indexes of array.
 * @param {string[]} array
 * @example
 * const iterator = tokenIterator(['x','y'])
 * iterator.peekNext() // y
 * @return {Object}
 */
export function tokenIterator(array) {
  let index = 0;

  return {
    /**
     * Return previous index of array
     * @return {string}
     */
    peekPrevious() {
      return array[index - 1];
    },
    /**
     * Return current index of array
     * @return {string}
     */
    peek() {
      return array[index];
    },
    /**
     * Return next index of array
     * @return {string}
     */
    peekNext() {
      return array[index + 1];
    },
    /**
     * Return current index of array and increment array index
     * @return {string}
     */
    consume() {
      return array[index++];
    },
  };
}
