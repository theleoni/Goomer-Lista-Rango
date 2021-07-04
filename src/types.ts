
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
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
