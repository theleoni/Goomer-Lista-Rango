import { Pool } from 'pg';

import { DinnerModel } from './dinner';
import { WorkingHourModel } from './workingHours';

export interface Model {
  readonly tableName: string;
  readonly CONN: Pool;
}

export class DB {

  private static instance: DB;

  // private mongoDB: Connection;
  private models: {
    Dinner: DinnerModel;
    WorkingHour: WorkingHourModel;
    // Product: IProductModel;
    // User: IAuthModel;
  };
  private poolConnection: Pool;

  constructor() {
    try {
      this.poolConnection = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
      })
    } catch (err) {
      console.error(err);
    }

    this.models = {
      Dinner: new DinnerModel(this.poolConnection),
      WorkingHour: new WorkingHourModel(this.poolConnection),
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static get Models() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance.models;
  }
}

export * from './user.model';
// export * from './dinner';
// export * from './workingHours';
// export * from './product.model';
