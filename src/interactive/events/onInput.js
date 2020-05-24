import { scan } from '../../parser/scanner.js';
import { parse } from '../../parser/parser.js';
import { evaluate } from '../../evaluate/evaluate.js';
import { INVALID, PRINT, QUIT } from '../../parser/node.js';
import { isNodes, logNode } from '../../helpers/helpers.js';

/** @type {import('../../parser/node.js').Node} */
let inMemoryStorage = [];

/**
 * Called whenever the input stream receives an end-of-line input <Enter>, or <Return>
 * @param {string} line
 * @returns {void}
 */
export function onInput(line) {
  if (!line) {
    return;
  }

  const ast = parse(scan(line));

  // Handle invalid command
  if (isNodes(ast, INVALID)) {
    ast.forEach((node) => logNode(node, INVALID, `invalid =>`));
    return;
  }

  // Save for later evalutation
  inMemoryStorage.push(...ast);

  if (isNodes(ast, QUIT)) {
    process.exit(0);
  }

  if (isNodes(ast, PRINT)) {
    const lines = inMemoryStorage;
    inMemoryStorage = [];
    evaluate(lines);
  }
}
