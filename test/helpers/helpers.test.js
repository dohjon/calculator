import riteway from 'riteway';
const describe = riteway.describe;
import { INVALID, REGISTER, VALUE } from './../../src/parser/node.js';

import { isNode, tokenIterator, getNode, isLeafNode } from './../../src/helpers/helpers.js';

describe('tokenIterator()', async (assert) => {
  assert({
    given: `calling tokenIterator with array`,
    should: `return object`,
    actual: typeof tokenIterator([]),
    expected: 'object',
  });

  assert({
    given: `tokenIterator.peek`,
    should: `return function`,
    actual: typeof tokenIterator([]).peek,
    expected: 'function',
  });

  assert({
    given: `calling peek() with empty array`,
    should: `return undefined`,
    actual: tokenIterator([]).peek(),
    expected: undefined,
  });

  assert({
    given: `calling peek() with argument [1, 2]`,
    should: `return 1`,
    actual: tokenIterator([1, 2]).peek(),
    expected: 1,
  });

  assert({
    given: `tokenIterator.consume`,
    should: `return function`,
    actual: typeof tokenIterator([]).consume,
    expected: 'function',
  });

  assert({
    given: `calling consume() with empty array`,
    should: `return undefined`,
    actual: tokenIterator([]).consume(),
    expected: undefined,
  });

  assert({
    given: `calling consume() with argument [2, 1]`,
    should: `return 2`,
    actual: tokenIterator([2, 1]).consume(),
    expected: 2,
  });

  assert({
    given: `tokenIterator.peekNext`,
    should: `return function`,
    actual: typeof tokenIterator([]).peekNext,
    expected: 'function',
  });

  assert({
    given: `calling peekNext() with empty array`,
    should: `return undefined`,
    actual: tokenIterator([]).peekNext(),
    expected: undefined,
  });

  assert({
    given: `calling peekNext() with argument [1, 2]`,
    should: `return 2`,
    actual: tokenIterator([1, 2]).peekNext(),
    expected: 2,
  });

  assert({
    given: `tokenIterator.peekPrevious`,
    should: `return function`,
    actual: typeof tokenIterator([]).peekPrevious,
    expected: 'function',
  });

  assert({
    given: `calling peekPrevious() with empty array`,
    should: `return undefined`,
    actual: tokenIterator([]).peekPrevious(),
    expected: undefined,
  });

  let iterator = tokenIterator([1, 2]);
  iterator.consume();

  assert({
    given: `arguments [1, 2] calling consumed() followed by peekPrevious()`,
    should: `return 1`,
    actual: iterator.peekPrevious(),
    expected: 1,
  });
});

describe('isNode()', async (assert) => {
  assert({
    given: `matching types`,
    should: `return true`,
    actual: isNode(
      {
        val: '_',
        type: INVALID,
        children: [],
      },
      INVALID
    ),
    expected: true,
  });

  assert({
    given: `nested children with matching types`,
    should: `return true`,
    actual: isNode(
      {
        val: '_',
        type: REGISTER,
        children: [
          {
            val: '_',
            type: INVALID,
            children: [],
          },
        ],
      },
      INVALID
    ),
    expected: true,
  });
});

describe('isLeafNode()', async (assert) => {
  const node = {
    val: 'x',
    type: REGISTER,
    children: [],
  };

  assert({
    given: `no children nodes`,
    should: `return true`,
    actual: isLeafNode(node),
    expected: true,
  });
});

describe('isLeafNode()', async (assert) => {
  const node = {
    val: 'x',
    type: REGISTER,
    children: [
      {
        val: '_',
        type: INVALID,
        children: [],
      },
    ],
  };

  assert({
    given: `children nodes`,
    should: `return false`,
    actual: isLeafNode(node),
    expected: false,
  });
});

describe('getNode()', async (assert) => {
  const node = {
    val: 'x',
    type: REGISTER,
    children: [],
  };

  assert({
    given: `matching types`,
    should: `return the first node that matches`,
    actual: getNode(node, REGISTER),
    expected: {
      val: 'x',
      type: REGISTER,
      children: [],
    },
  });
});

describe('getNode()', async (assert) => {
  const node = {
    val: 'x',
    type: REGISTER,
    children: [],
  };

  assert({
    given: `no match`,
    should: `return false`,
    actual: getNode(node, VALUE),
    expected: false,
  });
});

describe('getNode()', async (assert) => {
  const node = {
    val: '_',
    type: INVALID,
    children: [
      {
        val: 'x',
        type: REGISTER,
        children: [],
      },
    ],
  };

  assert({
    given: `nested children with matching types`,
    should: `return the first node that matches`,
    actual: getNode(node, REGISTER),
    expected: {
      val: 'x',
      type: REGISTER,
      children: [],
    },
  });
});
