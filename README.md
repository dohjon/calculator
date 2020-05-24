
## Requirements

- Unix

```
$ node -v
v14.2.0

$ npm -v
6.14.4
```

## Install

```
git clone https://github.com/dohjon/calculator.git
```
```
npm install
```

## Test
```
npm test
```

## Usage

```js
// link bin to path 
npm link

// or use path
$ lib/calculator.js

// arguments
$ calculator x add 3 print x

// interactive
$ calculator

// file
$ calculator text.txt

```

## Assumptions
- Assumption: Cross platform support is not needed.
- Assumption: data does not need to be saved after application exits
- Assumption: no advanced error handling
- Assumption: only synchronous code
- Assumption: no need to handle signals (SIGINT, SIGTERM, etc) in interactive mode
- Assumption: no need to optimize by using steams (read file content into memory)
- Assumption: process should exit with 0 even when invalid tokens.
- Assumption: no special characters needs to be supported
- Assumption: operations words cannot be valid register word
- Assumption: quit, print cannot be valid register word
- Assumption: Beacuse this is a test I avoided using external libraries except for linting, formatting and testing. In the real world I would use existing libraries for everything.
- Assumption: Circular dependency is not implemenented. Input using below examples will cause endless recursion.

    x => y

    y => x 

    And

    x => y 

    y => y 


## Overview

Scan => Parse => Evaluate => Calculate

### Scan

Converts a string to tokens.

```
'x add 3'
```

To

```
['x', 'add', '3']
```

### Parse

Converts tokens to AST (abstract syntax tree)

```
['x', 'add', '3', 'print', 'x']
```

To

```
[
    {
        val: 'x',
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
    }
]
```

### Add new operation

Add new operation **handler** in `operations.js`
```
function division(a, b) {
  return a / b;
}
```

Add **handler** to **operations** in `operations.js`
```
export const operations = {
  division: division,
  ...
};
```

Add **name** of handler to **operation** in `parser/rules.js`
```
export const operation = `^division$`;
```


## Built with

- [eslint](https://github.com/eslint/eslint) - Linter
- [prettier](https://github.com/prettier/prettier) - Formatter
- [riteway](https://github.com/ericelliott/riteway) - Testing