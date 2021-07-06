import { Pool } from 'pg';

import { RestaurantModel } from './restaurant';
import { WorkingHourModel } from './workingHours';

export interface Model {
  readonly tableName: string;
  readonly CONN: Pool;
}

export class DB {

  private static instance: DB;

  // private mongoDB: Connection;
  private models: {
    Restaurant: RestaurantModel;
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
      Restaurant: new RestaurantModel(this.poolConnection),
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
