import riteway from 'riteway';
import { newlines, readFile, isNumeric } from './../../src/utils/utils.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const describe = riteway.describe;
const Try = riteway.Try;

describe('readFile()', async (assert) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const file = resolve(__dirname, `./test.txt`);

  assert({
    given: 'file',
    should: 'return file content',
    actual: readFile(file),
    expected: 'x add 1\nprint x',
  });

  assert({
    given: 'non existing file path',
    should: 'not throw error',
    actual: Try(readFile(`../some/file.txt`)),
    expected: undefined,
  });
});

describe('newlines', async (assert) => {
  assert({
    given: `string containing newlines`,
    should: `replace newlines with whitespace`,
    actual: `A add 2\nA add 3\nprint A`.replace(newlines, ` `),
    expected: 'A add 2 A add 3 print A',
  });
});

describe('isNumeric()', async (assert) => {
  assert({
    given: '0',
    should: 'return true',
    actual: isNumeric(0),
    expected: true,
  });

  assert({
    given: 'x',
    should: 'return true',
    actual: isNumeric('x'),
    expected: false,
  });
});
