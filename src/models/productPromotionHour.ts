import { Pool, QueryResult } from 'pg';
import { ProductPromotionHour } from '../types';
import { Model } from './index';

export class ProductPromotionHourModel implements Model {

  tableName = 'product_promotion_hour';
  CONN: Pool;

  constructor(conn: Pool) {
    this.CONN = conn;
  }

  async list(_idProduct: string): Promise<ProductPromotionHour[]> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT *
        FROM ${this.tableName}
        WHERE product=$1`,
        [_idProduct],
      );
      return data.rows.map(e => ({
        id: e.id,
        weekDay: e.weekday,
        begin: e.open,
        end: e.close,
      } as ProductPromotionHour));
    } catch (err) {
      throw err;
    }
  }

  async add(_workingHour: ProductPromotionHour): Promise<ProductPromotionHour> {
    try {
      await this.CONN.query(
        `INSERT INTO ${this.tableName}(id, product, weekday, open, close)
        VALUES ($1, $2, $3, $4, $5)`,
        [
          _workingHour.id,
          _workingHour.product,
          _workingHour.weekDay,
          _workingHour.begin,
          _workingHour.end,
        ]
      );
      return {
        ..._workingHour,
        product: undefined,
      };
    } catch (err) {
      throw err;
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this.CONN.query(
        `DELETE
        FROM ${this.tableName}
        WHERE id=$1`,
        [_id],
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteAll(_idProduct: string): Promise<void> {
    try {
      await this.CONN.query(
        `DELETE
        FROM ${this.tableName}
        WHERE product=$1`,
        [_idProduct],
      );
    } catch (err) {
      throw err;
    }
  }
}
