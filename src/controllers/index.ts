
import { Pool } from 'pg';

// import { connect, connection, Connection } from 'mongoose';
import {
  // Product, IProductModel,
  // User,
  // IAuthModel
  DinnerModel,
} from '../models/index';

interface IModels {
  Dinner: DinnerModel;
  // Product: IProductModel;
  // User: IAuthModel;
}

export class DB {


  private static instance: DB;

  // private mongoDB: Connection;
  private models: IModels;
  private poolConnection: Pool;

  constructor() {
  	try {
  		// connect(process.env.MONGO_URL as string, { useNewUrlParser: true, useUnifiedTopology: true });
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

    // if (!DB.poolConnection) {
      // DB.poolConnection.end();


    this.models = {
      Dinner: new DinnerModel(this.poolConnection),
    };


    // }

    // pool.query('SELECT NOW()', (err, res) => {
    //   console.log(err, res)
    //   pool.end()
    // })
  	// this.mongoDB = connection;
  	// this.mongoDB.on('open', this.connected);
  	// this.mongoDB.on('error', this.error);

  	// this.models = { Product: new Product().model, User: new User().model };
    // this.models = {
    //   Dinner: new Dinner().model,
    // }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static get Models() {
  	if (!DB.instance) {
  		DB.instance = new DB();
  	}
  	return DB.instance.models;
  }
  //
  // private connected() {
  // 	console.info('Mongoose has connected');
  // }
  //
  //
  // private error(error: Error) {
  // 	console.info('Mongoose has errored', error);
  // }
}

// export { ProductDao, IProductDao } from './Product/ProductDao';
export { DinnerController } from './Dinner/DinnerDao';
export { AuthDao, IAuthDao } from './Auth/AuthDao';
