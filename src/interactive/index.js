import readline from 'readline';
import { onExit } from './events/onExit.js';
import { onInput } from './events/onInput.js';

/**
 * Start interactive session on the command line.
 * @returns {void}
 */
export function interactiveMode() {
  const prompt = readline.createInterface({ input: process.stdin });

  prompt.on('line', onInput);

  prompt.once('close', onExit);
}
