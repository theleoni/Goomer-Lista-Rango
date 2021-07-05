
export interface Dinner {
  id?: string;
  picture?: any;
  name: string;
  fullAddress: string;
  workingHours?: WorkingHour[];
}

export interface WorkingHour {
  id?: string;
  dinner?: string; // handle the fk (Dinner)
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

export interface Product {
  id?: string;
  picture?: any;
  name: string;
  price: number;
  category: string;
  promotion?: {
    description: string;
    price: number;
    promotionHour: ProductPromotionHour[];
  };
}

export interface ProductPromotionHour {
  id?: string;
  product?:string; // handle the fk (Product)
  weekDay: WeekDays;
  begin: string;
  end: string;
}
