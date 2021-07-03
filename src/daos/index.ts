import { Pool } from 'pg';

import {
  // Product, IProductModel,
  // User,
  // IAuthModel
  DinnerModel,
} from '../models/index';

export interface Models {
  Dinner: DinnerModel;
  // Product: IProductModel;
  // User: IAuthModel;
}

export class DB {


  private static instance: DB;

  // private mongoDB: Connection;
  private models: Models;
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

// export { ProductDao, IProductDao } from './Product/ProductDao';
export { DinnerDao } from './dinner';
export { AuthDao, IAuthDao } from './Auth/AuthDao';
