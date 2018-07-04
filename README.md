# typecheck-extended (0.1.0)

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
The following have been added or modified from the expected JS return of `typeof foo`.
- `array`: Provides a better distinction between arrays (ex. `['a', 'b', 'c']`) and non-array objects.
- `enum`: value must be included in a predefined list
- `object`: Excludes arrays from object test. Checks for non-array objects. (ex. `{ a: 1, b: 2, c: 3 }`)

## Example Usage


### Parameters
- `parameter`: **Any** - The parameter to have its type validated
- `type`: **String** - Expected type of parameter. Limited to one of the *Available Types* listed above.
- `required`: **Bool** - Defaults to `true`. *(Optional).*
- `format`: **Array** - List of valid `enums`. *(Optional).*


### Ex. Required String:   
`name` must be passed in AND be `string`. 

```javascript
function SayHi(name) {
  TypeCheck(name, 'string');
  return (`Hi ${name}!`);
}
```
### Ex. Optional String:   
`name` can be `undefined` or `null`
Otherwise, any value passed in must be `string`. 

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
`uuid` must be passed in AND be `string`.   
`color` must be passed in AND be `red`, `green`, or `blue`. 
```javascript
const availableColors = ['red', 'green', 'blue'];
function SaveColorValue(uuid, color) {
  TypeCheck(uuid, 'string');
  TypeCheck(color, 'enum', true, availableColors);
  SaveToDb(uuid, color);
}
```
