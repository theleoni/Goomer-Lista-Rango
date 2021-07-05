
export interface Dinner {
  id?: string;
  picture?: any;
  name: string;
  fullAddress: string;
  workingHours?: WorkingHour[];
}

export interface WorkingHour {
  id?: string;
  dinner?:string;
  weekDay: WeekDays;
  open: string;
  close: string;
}

export enum WeekDays {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}
