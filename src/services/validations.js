export const required = value => (value ? undefined : '*');

export const selectRequired = value => (value && value !== 'placeholder' ? undefined : 'This field is required');

export const number = value => (value && isNaN(Number(value)) ? 'This field must be a number' : undefined);

export const nonDecimal = value =>
  value && value.indexOf('.') !== -1 ? 'This number could not have decimals' : undefined;

export const positive = value => (value < 0 ? 'This field must be positive' : undefined);

export const numberRange = (value, range) => {
  if(value < range.from) {
    return range.from
  } else if(value > range.to) {
    return range.to
  } else {
    return value
  }
};

export const phone = value =>
  value.length < 7 ? 'The phone number must be at least 7 digits long' : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid mail format' : undefined;

export const numberOrBar = value =>
  !/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/i.test(value)
    ? 'Invalid date format'
    : undefined;

export const validDate = value => {
  if (
    isNaN(new Date(value).getTime()) ||
    !/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(value)
  ) {
    return 'It must be a valid date';
  }
  if (new Date().getTime() - new Date(value).getTime() < 0) {
    return 'The date can not be a future date';
  }
  return undefined;
};

export const between = (value1, value2) => value =>
  Number(value) < value1 || Number(value) > value2
    ? `The field must have a value from ${value1} to ${value2}`
    : undefined;
