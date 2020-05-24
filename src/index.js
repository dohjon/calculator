import { interactiveMode } from './interactive/index.js';
import { evaluate } from './evaluate/evaluate.js';
import { parse } from './parser/parser.js';
import { scan } from './parser/scanner.js';
import { logger, readFile, parseCommandLineArguments } from './utils/utils.js';

/**
 * Entry point of application
 * @return {void}
 */
export function init() {
  // Assumption: no advanced error handling
  // Assumption: only synchronous code

  try {
    const args = parseCommandLineArguments();

    let input;
    // interactive mode + piping
    if (args.length === 0) {
      interactiveMode();
    }

    // input is from file
    if (args.length === 1) {
      const [filePath] = args;
      input = readFile(filePath);
    }

    // input is from arguments
    if (args.length > 1) {
      input = args.join(` `);
    }

    evaluate(parse(scan(input)));
  } catch (error) {
    logger(error);
    process.exitCode = 1;
  }
}
