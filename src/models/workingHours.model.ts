
export enum WeekDays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface WorkingHour {
  weekDay: WeekDays;
  open: number;
  close: number;
}
