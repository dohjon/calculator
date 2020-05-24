import riteway from 'riteway';
const describe = riteway.describe;

import { scan } from './../../src/parser/scanner.js';

describe('scan()', async (assert) => {
  assert({
    given: `no arguments`,
    should: `return empty array`,
    actual: scan(),
    expected: [],
  });

  assert({
    given: `a string`,
    should: `return string in uppercase`,
    actual: scan(`x`),
    expected: ['X'],
  });

  assert({
    given: `string with whitespaces`,
    should: `return string trimmed`,
    actual: scan(`  x  `),
    expected: ['X'],
  });

  assert({
    given: `empty string`,
    should: `return empty array`,
    actual: scan(``),
    expected: [],
  });

  assert({
    given: `string with newlines`,
    should: `remove all occurences of \\n from string`,
    actual: scan(`A add 2\nA add 3\nprint A`),
    expected: ['A', 'ADD', '2', 'A', 'ADD', '3', 'PRINT', 'A'],
  });
});
