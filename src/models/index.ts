import { Pool } from 'pg';

import { RestaurantModel } from './restaurant';
import { WorkingHourModel } from './workingHour';
import { ProductModel } from './product';
import { ProductPromotionHourModel } from './productPromotionHour';

import { NotAcceptableError } from '../errorTypes';

export interface Model {
  readonly tableName: string;
  readonly CONN: Pool;
}

export class DB {

  private static instance: DB;

  private models: {
    Restaurant: RestaurantModel;
    WorkingHour: WorkingHourModel;
    Product: ProductModel;
    ProductPromotionHour: ProductPromotionHourModel;
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
      throw new NotAcceptableError('DB connections error: ' + err);
    }

    this.models = {
      Restaurant: new RestaurantModel(this.poolConnection),
      WorkingHour: new WorkingHourModel(this.poolConnection),
      Product: new ProductModel(this.poolConnection),
      ProductPromotionHour: new ProductPromotionHourModel(this.poolConnection),
    };
  }

  public static get Models() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance.models;
  }
}
