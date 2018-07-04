import TypeCheck from './';

function testFunction() {}
const testArray = ['bob', 'sally'];
const testObject = { uncle: 'bob' };
const testNumber = 123456;
const testString = 'Bob is your uncle.';
const testBool = false;
const testSymbol = Symbol(testObject);

const types = {
  arr: 'array',
  bool: 'boolean',
  enum: 'enum',
  func: 'function',
  num: 'number',
  obj: 'object',
  str: 'string',
  sym: 'symbol',
  und: 'undefined',
};

describe('Type Check Service', () => {
  // Should Pass
  it('TypeCheck: Boolean is Boolean', () => {
    expect(TypeCheck(testBool, types.bool))
      .toBe(true);
  });

  it('TypeCheck: Function is Function', () => {
    expect(TypeCheck(testFunction, types.func))
      .toBe(true);
  });

  it('TypeCheck: Number is Number', () => {
    expect(TypeCheck(testNumber, types.num))
      .toBe(true);
  });

  it('TypeCheck: Array is Array', () => {
    expect(TypeCheck(testArray, types.arr))
      .toBe(true);
  });

  it('TypeCheck: Object is Object', () => {
    expect(TypeCheck(testObject, types.obj))
      .toBe(true);
  });

  it('TypeCheck: String is String', () => {
    expect(TypeCheck(testString, types.str))
      .toBe(true);
  });

  it('TypeCheck: Symbol is Symbol', () => {
    expect(TypeCheck(testSymbol, types.sym))
      .toBe(true);
  });

  it('TypeCheck: Enum (string) is Valid Enum', () => {
    expect(TypeCheck('green', 'enum', false, ['red', 'green', 'blue']))
      .toBe(true);
  });

  it('TypeCheck: Enum (number) is Valid Enum', () => {
    expect(TypeCheck(8, 'enum', false, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]))
      .toBe(true);
  });

  it('Optional (undefined) Params are Allowed', () => {
    expect(TypeCheck(undefined, 'string', false))
      .toBe(true);
  });

  it('Optional (null) Params are Allowed', () => {
    expect(TypeCheck(null, 'string', false))
      .toBe(true);
  });

  // Should Throw
  it('TypeCheck: Undefined IS NOT Boolean', () => {
    expect(() => { TypeCheck(types.und, types.bool); })
      .toThrow('TypeCheck Error: (undefined) should be boolean');
  });

  it('TypeCheck: String IS NOT Function', () => {
    expect(() => { TypeCheck(testString, types.func); })
      .toThrow('TypeCheck Error: (Bob is your uncle.) should be function');
  });

  it('TypeCheck: String IS NOT Number', () => {
    expect(() => { TypeCheck(testString, types.num); })
      .toThrow('TypeCheck Error: (Bob is your uncle.) should be number');
  });

  it('TypeCheck: Number IS NOT Object', () => {
    expect(() => { TypeCheck(testNumber, types.obj); })
      .toThrow('TypeCheck Error: (123456) should be object');
  });

  it('TypeCheck: Function IS NOT Object', () => {
    expect(() => { TypeCheck(testFunction, types.obj); })
      .toThrow('TypeCheck Error: (function testFunction() {}) should be object');
  });

  it('TypeCheck: Array IS NOT Object', () => {
    expect(() => { TypeCheck(testArray, types.obj); })
      .toThrow('TypeCheck Error: (bob,sally) should be object');
  });

  it('TypeCheck: Object IS NOT Array', () => {
    expect(() => { TypeCheck(testObject, types.arr); })
      .toThrow(`TypeCheck Error: (${testObject}) should be array`);
  });

  it('TypeCheck: Number IS NOT String', () => {
    expect(() => { TypeCheck(testNumber, types.str); })
      .toThrow('TypeCheck Error: (123456) should be string');
  });

  it('TypeCheck: Object IS NOT Symbol', () => {
    expect(() => { TypeCheck(testObject, types.sym); })
      .toThrow(`TypeCheck Error: (${testObject}) should be symbol`);
  });

  it('TypeCheck: Enum IS NOT Valid', () => {
    expect(() => {
      TypeCheck('pink', 'enum', false, ['red', 'green', 'blue']);
    })
      .toThrow('TypeCheck Error: (pink) is invalid enum.');
  });

  it('TypeCheck: Enum IS NOT Valid', () => {
    expect(() => {
      TypeCheck(32, 'enum', false, [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    })
      .toThrow('TypeCheck Error: (32) is invalid enum.');
  });

  it('TypeCheck: Fake News Type', () => {
    expect(() => { TypeCheck(testObject, 'Fake News'); })
      .toThrow('TypeCheck Error: (Fake News) is not a valid type.');
  });
});
