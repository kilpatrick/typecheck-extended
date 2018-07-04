/* eslint valid-typeof: 0 */

exports.TypeCheck = TypeCheckExtended;

function TypeCheckExtended(parameter, type, required = true, format = null) {
  /*
  Used at top of functions to validate type of parameters received.
    parameter  <-----  Any (The parameter that's being checked)
    type       <-----  String (See types)
    required   <-----  String (If not required, value must be falsey to pass check)
    format     <-----  Array (used by enum)

  To allow intuitive type checking, TypeCheck alters default JS 'typeof' as follows:
    'array': now independent type separate from object
    'object': now excludes objects that are also arrays
    'enum': ensures parameter is in specfied array. Pass allowed values as 'format'
  */
  const types = [
    'array',
    'boolean',
    'enum',
    'function',
    'number',
    'object',
    'string',
    'symbol',
    'undefined',
  ];

  const extendedTypes = ['array', 'enum'];

  if (!types.includes(type)) {
    throw new Error(`TypeCheck Error: (${type}) is not a valid type.`);
  }

  if (required || (!required && parameter)) {
    // Differentiate between arrays and non-array objects
    if (
      (type === 'array' && !Array.isArray(parameter)) ||
      (type === 'object' && Array.isArray(parameter))
    ) {
      throw new Error(`TypeCheck Error: (${parameter}) should be ${type}`);
    }

    // Enum Checks
    if (type === 'enum') {
      if (format.includes(parameter)) {
        return true;
      }
      throw new Error(`TypeCheck Error: (${parameter}) is invalid enum.`);
    }

    if (!extendedTypes.includes(type) && typeof parameter !== type) {
      throw new Error(`TypeCheck Error: (${parameter}) should be ${type}`);
    }
  }

  return true;
}
