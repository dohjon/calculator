import { isToken, print, value, register, quit, operation } from './rules.js';
import { createNode, REGISTER, OPERATION, VALUE, PRINT, QUIT, INVALID } from './node.js';
import { isNumeric } from '../utils/utils.js';
import { tokenIterator } from '../helpers/helpers.js';

/**
 * Create invalid AST (abstract syntax tree) node
 * @param {string[]} tokens
 * @returns {import('./node.js').Node}
 */
export function parseInvalid(tokens) {
  return createNode(tokens.consume(), INVALID, []);
}

/**
 * Create quit AST (abstract syntax tree) node
 * @param {string[]} tokens
 * @returns {import('./node.js').Node}
 */
export function parseQuit(tokens) {
  return createNode(tokens.consume(), QUIT, []);
}

/**
 * Create print AST (abstract syntax tree) node
 * @param {string[]} tokens
 * @returns {import('./node.js').Node}
 */
export function parsePrint(tokens) {
  // previous token <register>
  // next token <value>
  if (isToken(tokens.peekNext(), register)) {
    const node = createNode(tokens.consume(), PRINT, []);
    node.children.push(parseRegister(tokens));
    return node;
  }

  // invalid token
  return parseInvalid(tokens);
}

/**
 * Create value AST (abstract syntax tree) node
 * @param {string[]} tokens
 * @returns {import('./node.js').Node}
 */
export function parseValue(tokens) {
  // previous token <operation>
  if (isToken(tokens.peekPrevious(), operation)) {
    let value = tokens.consume();
    // number when value, string when register
    if (isNumeric(value)) {
      value = Number(value);
    }

    return createNode(value, VALUE, []);
  }

  // invalid token
  return parseInvalid(tokens);
}

/**
 * Create operation AST (abstract syntax tree) node
 * @param {string[]} tokens
 * @returns {import('./node.js').Node}
 */
export function parseOperation(tokens) {
  const nextToken = tokens.peekNext();
  const previousToken = tokens.peekPrevious();

  // previous token <register>
  // next token <value>
  if (isToken(previousToken, register) && isToken(nextToken, value)) {
    const node = createNode(tokens.consume(), OPERATION, []);
    node.children.push(parseValue(tokens));
    return node;
  }

  // previous token <register>
  // next token <value>
  if (isToken(previousToken, register) && isToken(nextToken, value)) {
    const node = createNode(tokens.consume(), OPERATION, []);
    node.children.push(parseRegister(tokens));
    return node;
  }

  // invalid token
  return parseInvalid(tokens);
}

/**
 * Create register AST (abstract syntax tree) node
 * @param {string[]} tokens
 * @returns {import('./node.js').Node}
 */
export function parseRegister(tokens) {
  // next token <operation>
  if (isToken(tokens.peekNext(), operation)) {
    const node = createNode(tokens.consume(), REGISTER, []);
    node.children.push(parseOperation(tokens));
    return node;
  }

  // previous token <print>
  if (isToken(tokens.peekPrevious(), print)) {
    return createNode(tokens.consume(), REGISTER, []);
  }

  // invalid token
  return parseInvalid(tokens);
}

/**
 * Checks if token is valid/invalid and what the next step for parsing should be.
 * @param {string[]} tokens
 * @returns {import('./node.js').Node}
 */
export function parseExpression(tokens) {
  const currentToken = tokens.peek();

  // next token <quit>
  if (isToken(currentToken, quit)) {
    return parseQuit(tokens);
  }
  // next token <print>
  else if (isToken(currentToken, print)) {
    return parsePrint(tokens);
  }
  // next token <register>
  else if (isToken(currentToken, register)) {
    return parseRegister(tokens);
  }
  // invalid token
  else {
    return parseInvalid(tokens);
  }
}

/**
 * Produces an AST (abstract syntax tree) from tokens.
 * @param {string[]} tokens
 * @returns {import('./node.js').Node[]}
 */
export function parse(tokens) {
  const iterator = tokenIterator(tokens);

  const ast = [];
  while (iterator.peek()) {
    // while we have tokens
    const node = parseExpression(iterator);
    ast.push(node);
  }

  return ast;
}
