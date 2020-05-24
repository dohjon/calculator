import riteway from 'riteway';
const describe = riteway.describe;

import {
  createNode,
  REGISTER,
  OPERATION,
  VALUE,
  PRINT,
  QUIT,
  INVALID,
} from './../../src/parser/node.js';

describe('createNode()', async (assert) => {
  assert({
    given: `arguments`,
    should: `return node`,
    actual: createNode('X', REGISTER, []),
    expected: { val: 'X', type: REGISTER, children: [] },
  });
});

describe('symbol REGISTER', async (assert) => {
  assert({
    given: `REGISTER.description`,
    should: `return 'register'`,
    actual: REGISTER.description,
    expected: 'register',
  });
});

describe('symbol OPERATION', async (assert) => {
  assert({
    given: `OPERATION.description`,
    should: `return 'operation'`,
    actual: OPERATION.description,
    expected: 'operation',
  });
});

describe('symbol VALUE', async (assert) => {
  assert({
    given: `VALUE.description`,
    should: `return 'value'`,
    actual: VALUE.description,
    expected: 'value',
  });
});

describe('symbol PRINT', async (assert) => {
  assert({
    given: `PRINT.description`,
    should: `return 'print'`,
    actual: PRINT.description,
    expected: 'print',
  });
});

describe('symbol QUIT', async (assert) => {
  assert({
    given: `QUIT.description`,
    should: `return 'quit'`,
    actual: QUIT.description,
    expected: 'quit',
  });
});

describe('symbol INVALID', async (assert) => {
  assert({
    given: `INVALID.description`,
    should: `return 'invalid'`,
    actual: INVALID.description,
    expected: 'invalid',
  });
});
