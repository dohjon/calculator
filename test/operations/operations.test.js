import riteway from 'riteway';
const describe = riteway.describe;
const Try = riteway.Try;

import {
  multiply,
  add,
  subtract,
  operations,
  doCalculation,
} from './../../src/operations/operations.js';

describe('multiply()', async (assert) => {
  assert({
    given: `positive numbers`,
    should: `return the correct sum`,
    actual: multiply(1, 1),
    expected: 1,
  });

  assert({
    given: `negative numbers`,
    should: `return the correct sum`,
    actual: multiply(-1, -1),
    expected: 1,
  });
});

describe('subtract()', async (assert) => {
  assert({
    given: `positive numbers`,
    should: `return the correct sum`,
    actual: subtract(1, 1),
    expected: 0,
  });

  assert({
    given: `negative numbers`,
    should: `return the correct sum`,
    actual: subtract(0, -1),
    expected: 1,
  });
});

describe('add()', async (assert) => {
  assert({
    given: `positive numbers`,
    should: `return the correct sum`,
    actual: add(1, 1),
    expected: 2,
  });

  assert({
    given: `negative numbers`,
    should: `return the correct sum`,
    actual: add(-1, -1),
    expected: -2,
  });
});

describe('operations', async (assert) => {
  assert({
    given: `operations.add`,
    should: `return function`,
    actual: typeof operations.add,
    expected: `function`,
  });

  assert({
    given: `operations.add`,
    should: `return reference to add function`,
    actual: operations.add.name,
    expected: `add`,
  });

  assert({
    given: `operations.subtract`,
    should: `return function`,
    actual: typeof operations.subtract,
    expected: `function`,
  });

  assert({
    given: `operations.subtract`,
    should: `return reference to subtract function`,
    actual: operations.subtract.name,
    expected: `subtract`,
  });

  assert({
    given: `operations.multiply`,
    should: `return function`,
    actual: typeof operations.multiply,
    expected: `function`,
  });

  assert({
    given: `operations.multiply`,
    should: `return reference to multiply function`,
    actual: operations.multiply.name,
    expected: `multiply`,
  });
});

describe('doCalculation()', async (assert) => {
  assert({
    given: `existing operation`,
    should: `return correct sum`,
    actual: doCalculation(1, `add`, 1),
    expected: 2,
  });

  assert({
    given: `non existing operation`,
    should: `throw`,
    actual: Try(doCalculation, 1, `_add_`, 1).toString(),
    expected: 'Error: Invalid operation',
  });
});
