
export interface Dinner {
  id?: string;
  picture?: any;
  name: string;
  fullAddress: string;
  workingHours?: WorkingHour[];
}

export interface WorkingHour {
  weekDay: WeekDays;
  open: number;
  close: number;
}

export enum WeekDays {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
