
export const OPENING_MINIMUM_INTERVAL = 15; // in minutes

const TIME_REGEX = /\d{2}:\d{2}/i;

/**
* Validate the time format (have to be HH:mm)
*/
export const timeCustomValidationFunction = (attribute: string, value: string) => {
  if (!TIME_REGEX.test(value)) {
    throw new Error (`${attribute} time isn't provided in the right format (found ${value}, use HH:mm instead)`)
  }
  return value;
};
