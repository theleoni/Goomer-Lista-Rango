import Joi from 'joi';

import { OPENING_MINIMUM_INTERVAL, timeCustomValidationFunction } from '../utils/time.utils';

export const ProductPromotionHourValidation: Joi.AnySchema = Joi.object({
  weekDay: Joi.number().required().min(0).max(6),
  begin: Joi.string().required().custom((value) => {
    return timeCustomValidationFunction('begin', value);
  }),
  end: Joi.string().required().custom((value) => {
    return timeCustomValidationFunction('end', value);
  }),
});

export const ProductValidation: Joi.AnySchema = Joi.object({
  restaurant: Joi.string().required(),
  picture: Joi.any(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  fullAddress: Joi.string(),
  promotion: Joi.object({
    description: Joi.string().required(),
    price: Joi.number().required(),
    promotionHours: Joi.array().required().items(ProductPromotionHourValidation).custom(list => {
      // will sort by weekDay, then by opening time
      list.sort((a: any, b: any) => {
        const weekDay: number = a.weekDay - b.weekDay;
        if (weekDay === 0) {
          const [ aHour ] = a.begin.substring(':');
          const [ bHour ] = b.begin.substring(':');
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
          const [ beforeCloseHour, beforeCloseMinute ] = list[index - 1].end.split(':');
          const [ thatOpenHour, thatOpenMinute ] = item.begin.split(':');

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
  }),
})
