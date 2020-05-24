import riteway from 'riteway';
const describe = riteway.describe;

import { quit, operation, print, value, register, isToken } from './../../src/parser/rules.js';

describe('isToken(quit)', async (assert) => {
  assert({
    given: `empty string`,
    should: `return false`,
    actual: isToken(``, quit),
    expected: false,
  });

  assert({
    given: `xquitx`,
    should: `return false`,
    actual: isToken(`xquitx`, quit),
    expected: false,
  });

  assert({
    given: `quit`,
    should: `return true`,
    actual: isToken(`quit`, quit),
    expected: true,
  });

  assert({
    given: `"Quit" in upper and lowercase characters`,
    should: `return true`,
    actual: isToken(`Quit`, quit),
    expected: true,
  });
});

describe('isToken(print)', async (assert) => {
  assert({
    given: `empty string`,
    should: `return false`,
    actual: isToken(``, print),
    expected: false,
  });

  assert({
    given: `xprintx`,
    should: `return false`,
    actual: isToken(`xprintx`, print),
    expected: false,
  });

  assert({
    given: `print`,
    should: `return true`,
    actual: isToken(`print`, print),
    expected: true,
  });

  assert({
    given: `"Print" in upper and lowercase characters`,
    should: `return true`,
    actual: isToken(`Print`, print),
    expected: true,
  });
});

describe('isToken(operation)', async (assert) => {
  assert({
    given: `empty string`,
    should: `return false`,
    actual: isToken(``, operation),
    expected: false,
  });

  assert({
    given: `xaddx`,
    should: `return false`,
    actual: isToken(`xaddx`, operation),
    expected: false,
  });

  assert({
    given: `add`,
    should: `return true`,
    actual: isToken(`add`, operation),
    expected: true,
  });

  assert({
    given: `"Add" in upper and lowercase characters`,
    should: `return true`,
    actual: isToken(`Add`, operation),
    expected: true,
  });

  assert({
    given: `xsubtractx`,
    should: `return false`,
    actual: isToken(`xsubtractx`, operation),
    expected: false,
  });

  assert({
    given: `subtract`,
    should: `return true`,
    actual: isToken(`subtract`, operation),
    expected: true,
  });

  assert({
    given: `"Subtract" in upper and lowercase characters`,
    should: `return true`,
    actual: isToken(`Subtract`, operation),
    expected: true,
  });

  assert({
    given: `xmultiplyx`,
    should: `return false`,
    actual: isToken(`xmultiplyx`, operation),
    expected: false,
  });

  assert({
    given: `multiply`,
    should: `return true`,
    actual: isToken(`multiply`, operation),
    expected: true,
  });

  assert({
    given: `"Multiply" in upper and lowercase characters`,
    should: `return true`,
    actual: isToken(`Multiply`, operation),
    expected: true,
  });
});

describe('isToken(value)', async (assert) => {
  assert({
    given: `empty string`,
    should: `return false`,
    actual: isToken(``, value),
    expected: false,
  });

  assert({
    given: `"x1" (character + digit)`,
    should: `return true`,
    actual: isToken(`x1`, value),
    expected: true,
  });

  assert({
    given: `"1x" (digit + character)`,
    should: `return true`,
    actual: isToken(`1x`, value),
    expected: true,
  });

  assert({
    given: `"1" (digits only)`,
    should: `return true`,
    actual: isToken(`1`, value),
    expected: true,
  });

  assert({
    given: `positive number`,
    should: `return true`,
    actual: isToken(`10`, value),
    expected: true,
  });

  assert({
    given: `negative number`,
    should: `return true`,
    actual: isToken(`-10`, value),
    expected: true,
  });
});

describe('isToken(register)', async (assert) => {
  assert({
    given: `empty string`,
    should: `return false`,
    actual: isToken(``, register),
    expected: false,
  });

  assert({
    given: `x1`,
    should: `return true`,
    actual: isToken(`x1`, register),
    expected: true,
  });

  assert({
    given: `1x`,
    should: `return true`,
    actual: isToken(`1x`, register),
    expected: true,
  });

  assert({
    given: `"1"`,
    should: `return false`,
    actual: isToken(`1`, register),
    expected: false,
  });

  assert({
    given: `"add"`,
    should: `return false`,
    actual: isToken(`add`, register),
    expected: false,
  });

  assert({
    given: `subtract`,
    should: `return false`,
    actual: isToken(`subtract`, register),
    expected: false,
  });

  assert({
    given: `multiply`,
    should: `return false`,
    actual: isToken(`multiply`, register),
    expected: false,
  });

  assert({
    given: `quit`,
    should: `return false`,
    actual: isToken(`quit`, register),
    expected: false,
  });

  assert({
    given: `print`,
    should: `return false`,
    actual: isToken(`print`, register),
    expected: false,
  });
});
