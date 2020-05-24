import riteway from 'riteway';
const describe = riteway.describe;

import { REGISTER, OPERATION, PRINT, VALUE } from './../../src/parser/node.js';
import { evaluate } from './../../src/evaluate/evaluate.js';

describe('evaluate()', async (assert) => {
  const ast = [
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
      val: 'y',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 1,
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },
  ];

  assert({
    given: `ast`,
    should: `not return any print nodes`,
    actual: evaluate(ast),
    expected: [
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
        val: 'y',
        type: REGISTER,
        children: [
          {
            val: 'add',
            type: OPERATION,
            children: [
              {
                val: 1,
                type: VALUE,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  });
});
