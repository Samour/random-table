const MIN_RANGE_VALUE = 1;
const MAX_RANGE_VALUE = 20; // Hardcoded, to become dynamic later

export const validNumeric = (value: string): boolean => {
  if (value === '') {
    return true;
  }
  if (!/^[0-9]*$/.test(value)) {
    return false;
  }
  const intValue = Number.parseInt(value);
  if (intValue < MIN_RANGE_VALUE || intValue > MAX_RANGE_VALUE) {
    return false;
  }
  return true;
};
