import Joi from 'joi';

const OPENING_MINIMUM_INTERVAL = 15; // in minutes
const TIME_REGEX = /\d{2}:\d{2}/i;

/**
* Validate the time format (have to be HH:mm)
*/
const whTimeCustomValidationFunction = (attribute: string, value: string) => {
  if (!TIME_REGEX.test(value)) {
    throw new Error (`${attribute} time isn't provided in the right format (found ${value}, use HH:mm instead)`)
  }
  return value;
};

export const WorkingHourValidation: Joi.AnySchema = Joi.object({
  weekDay: Joi.number().required().min(0).max(6),
  open: Joi.string().required().custom((value) => {
    return whTimeCustomValidationFunction('open', value);
  }),
  close: Joi.string().required().custom((value) => {
    return whTimeCustomValidationFunction('close', value);
  }),
});

export const DinnerValidation: Joi.AnySchema = Joi.object({
  picture: Joi.any(),
  name: Joi.string().required(),
  fullAddress: Joi.string(),
  workingHours: Joi.array().required().items(WorkingHourValidation).custom(list => {
    // will sort by weekDay, then by opening time
    list.sort((a: any, b: any) => {
      const weekDay: number = a.weekDay - b.weekDay;
      if (weekDay === 0) {
        const [ aHour ] = a.open.substring(':');
        const [ bHour ] = b.open.substring(':');
        return aHour - bHour;
      }
      return weekDay;
    })

    // with multiples opening times
    list.forEach((item: any, index: number, list: any[]) => {
      // ingonre the first element
      if (index === 0) {
        return;
      }

      const beforeWeekDay = list[index - 1].weekDay;
      const thatWeekDay = item.weekDay;

      // validate if the weekday are consecutive, even in the last and first number of enum
      // (after all the 15 minutes can be applied any in the same day or consecutive day)
      if (
        (thatWeekDay - beforeWeekDay) <= 1
        || (beforeWeekDay === 6 && thatWeekDay === 0)
      ) {

        // convert the time string (like: '00:01') to an array (like: ['00', '01'])
        const [ beforeCloseHour, beforeCloseMinute ] = list[index - 1].close.split(':');
        const [ thatOpenHour, thatOpenMinute ] = item.open.split(':');

        // convert the open and close time to minutes
        const beforeCloseTime = (beforeCloseHour * 60) + beforeCloseMinute;
        const thatOpenTime = (thatOpenHour * 60) + thatOpenMinute;

        // get the time difference (always positive values)
        const differenceOpeningTime =
        beforeCloseTime > thatOpenTime
        ? beforeCloseTime - thatOpenTime
        : thatOpenTime - beforeCloseTime;

        // if is true, that is a problem, cause the minimum interval time to close-open need to be respected
        if (differenceOpeningTime < OPENING_MINIMUM_INTERVAL) {
          throw new Error(`minimum close-open interval not respected (found ${differenceOpeningTime}, the minimum is ${OPENING_MINIMUM_INTERVAL})`);
        }
      }
    });
    return list;
  }),
})
