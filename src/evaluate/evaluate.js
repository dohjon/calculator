import { isNode, isNodes, logNode } from '../helpers/helpers.js';
import { calculate } from './calculate.js';
import { QUIT, PRINT, INVALID } from '../parser/node.js';
import { logger } from '../utils/utils.js';

export function evaluate(ast) {
  if (isNodes(ast, INVALID)) {
    ast.forEach((node) => logNode(node, INVALID, `invalid =>`));
    return;
  }

  const previousNodes = [];

  for (const node of ast) {
    // PRINT
    if (isNode(node, PRINT)) {
      const result = calculate(node, previousNodes);
      logger(result);
    }
    // QUIT
    else if (isNode(node, QUIT)) {
      process.exitCode = 0;
      break;
    } else {
      previousNodes.push(node);
    }
  }

  return previousNodes;
}
