# typecheck-extended &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![npm version](https://img.shields.io/npm/v/typecheck-extended.svg?style=flat)](https://www.npmjs.com/package/typecheck-extended) [![Coverage Status](https://img.shields.io/coveralls/kilpatrick/typecheck-extended/master.svg?style=flat)](https://coveralls.io/github/kilpatrick/typecheck-extended?branch=master) [![CI Status](https://circleci.com/gh/kilpatrick/typecheck-extended.svg?style=svg)](https://circleci.com/gh/kilpatrick/typecheck-extended) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)







JavaScript type checker with extended types. Validates all built-in types. Additionally adds support for `enums` and makes an easier distinction between `array` and `object`.

## Install

`npm i typecheck-extended`

## Available Types

### Standard Types
The following native JS types are supported as-is:
- `boolean`
- `function`
- `number`
- `string`
- `symbol`
- `undefined`

### Extended Types

- `array`: Arrays only. (ex. `['a', 'b', 'c']`)
- `enum`: Adds enum support.
- `object`: *Non-array* objects only. (ex. `{ a: 1, b: 2, c: 3 }`)

In javascript, arrays have a `typeof` "object". typecheck-extended excludes arrays from an "object" type check.
```javascript
/*
  Standard Javascript
*/
>> typeof ['River Tam', 'Mal Reynolds']; // Returns "object"
>> typeof { name: 'Kaylee Frye' }; // Returns "object"
>> Array.isArray(['River Tam', 'Mal Reynolds']); // Returns true
>> Array.isArray({ name: 'Kaylee Frye' }); // Returns false

/*
  typecheck-extended
*/
>> TypeCheck(['River Tam', 'Mal Reynolds'], 'array'); // Returns true
>> TypeCheck({ name: 'Kaylee Frye' }, 'array'); // Throws error
>> TypeCheck({ name: 'Kaylee Frye' }, 'object'); // Returns true
>> TypeCheck(['River Tam', 'Mal Reynolds'], 'object'); // Throws error

```


## Example Usage


### Parameters
- `parameter`: **Any** - The parameter to have its type validated
- `type`: **String** - Expected type of parameter. Limited to one of the *Available Types* listed above.
- `required`: **Bool** - Defaults to `true`. *(Optional).*
- `format`: **Array** - List of valid `enums`. *(Optional).*


### Ex. Required String:
`name` must be received AND be `string`.

```javascript
function SayHi(name) {
  TypeCheck(name, 'string');
  return (`Hi ${name}!`);
}
```
### Ex. Optional String:
`name` can be `undefined` or `null`
If `name` is received, it must be `string`.

```javascript
function SayHi2(name) {
  TypeCheck(name, 'string', false);
  if (name) {
      return (`Hi ${name}!`);
  }
  return ("Hi, I'm typecheck-extended. What's your name?");
}
```

### Ex. Required Enum:
`uuid` must be received AND be `string`.
`color` must be received AND be `red`, `green`, or `blue`.
```javascript
const availableColors = ['red', 'green', 'blue'];
function SaveColorValue(uuid, color) {
  TypeCheck(uuid, 'string');
  TypeCheck(color, 'enum', true, availableColors);
  SaveToDb(uuid, color);
}
```


---
###### typecheck-extended uses [Semantic Versioning](https://semver.org). | Copyright © 2022 Chris Kilpatrick. Released under [MIT License](https://opensource.org/licenses/MIT).
