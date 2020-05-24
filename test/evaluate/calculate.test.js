import riteway from 'riteway';
const describe = riteway.describe;

import { calculate } from './../../src/evaluate/calculate.js';
import { OPERATION, REGISTER, VALUE, PRINT } from './../../src/parser/node.js';

describe('calculate()', async (assert) => {
  const printNode = {
    val: 'print',
    type: PRINT,
    children: [
      {
        val: 'A',
        type: REGISTER,
        children: [],
      },
    ],
  };

  const ast = [
    {
      val: 'A',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 2,
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },
    {
      val: 'A',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 3,
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
    should: `return the correct result`,
    actual: calculate(printNode, ast),
    expected: 5,
  });
});

describe('calculate()', async (assert) => {
  const printNode = {
    val: 'print',
    type: PRINT,
    children: [
      {
        val: 'B',
        type: REGISTER,
        children: [],
      },
    ],
  };

  const ast = [
    {
      val: 'B',
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
      val: 'B',
      type: REGISTER,
      children: [
        {
          val: 'subtract',
          type: OPERATION,
          children: [
            {
              val: 2,
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
    should: `return the correct result`,
    actual: calculate(printNode, ast),
    expected: 3,
  });
});

describe('calculate()', async (assert) => {
  const printNode = {
    val: 'print',
    type: PRINT,
    children: [
      {
        val: 'A',
        type: REGISTER,
        children: [],
      },
    ],
  };

  const ast = [
    {
      val: 'A',
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
    should: `return the correct result`,
    actual: calculate(printNode, ast),
    expected: 1,
  });
});

describe('calculate()', async (assert) => {
  const printNode = {
    val: 'print',
    type: PRINT,
    children: [
      {
        val: 'b',
        type: REGISTER,
        children: [],
      },
    ],
  };

  const ast = [
    {
      val: 'a',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 10,
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },
    {
      val: 'b',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 'a',
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },
    {
      val: 'b',
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
    should: `return the correct result`,
    actual: calculate(printNode, ast),
    expected: 11,
  });
});

describe('calculate()', async (assert) => {
  const printNode = {
    val: 'print',
    type: PRINT,
    children: [
      {
        val: 'result',
        type: REGISTER,
        children: [],
      },
    ],
  };

  const ast = [
    {
      val: 'result',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 'revenue',
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },
    {
      val: 'result',
      type: REGISTER,
      children: [
        {
          val: 'subtract',
          type: OPERATION,
          children: [
            {
              val: 'costs',
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },
    {
      val: 'revenue',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 200,
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },

    {
      val: 'costs',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 'salaries',
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },

    {
      val: 'salaries',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 20,
              type: VALUE,
              children: [],
            },
          ],
        },
      ],
    },

    {
      val: 'salaries',
      type: REGISTER,
      children: [
        {
          val: 'multiply',
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
      val: 'costs',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 10,
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
    should: `return the correct result`,
    actual: calculate(printNode, ast),
    expected: 90,
  });
});

describe('calculateNode()', async (assert) => {
  const printNode = {
    val: 'print',
    type: PRINT,
    children: [
      {
        val: 'result',
        type: REGISTER,
        children: [],
      },
    ],
  };

  const ast = [];

  assert({
    given: `empty ast`,
    should: `return undefined`,
    actual: calculate(printNode, ast),
    expected: undefined,
  });
});

describe('calculateNode()', async (assert) => {
  const printNode = {
    val: 'print',
    type: PRINT,
    children: [
      {
        val: 'x',
        type: REGISTER,
        children: [],
      },
    ],
  };

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
      val: 'y',
      type: REGISTER,
      children: [
        {
          val: 'add',
          type: OPERATION,
          children: [
            {
              val: 2,
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
          val: 'multiply',
          type: OPERATION,
          children: [
            {
              val: 4,
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
          val: 'subtract',
          type: OPERATION,
          children: [
            {
              val: 2,
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
    should: `return the correct result`,
    actual: calculate(printNode, ast),
    expected: 6,
  });
});
