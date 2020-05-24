import riteway from 'riteway';
const describe = riteway.describe;

import { parse } from './../../src/parser/parser.js';
import { REGISTER, OPERATION, QUIT, PRINT, VALUE, INVALID } from './../../src/parser/node.js';

describe('parse()', async (assert) => {
  assert({
    given: `['_', 'quit', '_']`,
    should: `return valid ast`,
    actual: parse(['_', 'quit', '_']),
    expected: [
      {
        val: '_',
        type: INVALID,
        children: [],
      },
      {
        val: 'quit',
        type: QUIT,
        children: [],
      },
      {
        val: '_',
        type: INVALID,
        children: [],
      },
    ],
  });

  assert({
    given: `['_', 'print', 'x', '_']`,
    should: `return valid ast`,
    actual: parse(['_', 'print', 'x', '_']),
    expected: [
      {
        val: '_',
        type: INVALID,
        children: [],
      },
      {
        val: 'print',
        type: PRINT,
        children: [
          {
            val: 'x',
            type: REGISTER,
            children: [],
          },
        ],
      },
      {
        val: '_',
        type: INVALID,
        children: [],
      },
    ],
  });

  assert({
    given: `['_','x', 'add', 'y','_']`,
    should: `return valid ast`,
    actual: parse(['_', 'x', 'add', 'y', '_']),
    expected: [
      {
        val: '_',
        type: INVALID,
        children: [],
      },
      {
        val: 'x',
        type: REGISTER,
        children: [
          {
            val: 'add',
            type: OPERATION,
            children: [
              {
                val: 'y',
                type: VALUE,
                children: [],
              },
            ],
          },
        ],
      },
      {
        val: '_',
        type: INVALID,
        children: [],
      },
    ],
  });

  assert({
    given: `['_','x', 'add', '5','_']`,
    should: `return valid ast`,
    actual: parse(['_', 'x', 'add', '5', '_']),
    expected: [
      {
        val: '_',
        type: INVALID,
        children: [],
      },
      {
        val: 'x',
        type: REGISTER,
        children: [
          {
            val: 'add',
            type: OPERATION,
            children: [
              {
                val: 5,
                type: VALUE,
                children: [],
              },
            ],
          },
        ],
      },
      {
        val: '_',
        type: INVALID,
        children: [],
      },
    ],
  });
});
