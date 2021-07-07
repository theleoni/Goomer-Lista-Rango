import { Pool, QueryResult } from 'pg';
import { WorkingHour } from '../types';
import { Model } from './index';

export class WorkingHourModel implements Model {

  tableName = 'working_hour';
  CONN: Pool;

  constructor(conn: Pool) {
    this.CONN = conn;
  }

  async list(_idRestaurant: string): Promise<WorkingHour[]> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT *
        FROM ${this.tableName}
        WHERE restaurant=$1`,
        [_idRestaurant],
      );
      return data.rows.map(e => ({
        id: e.id,
        weekDay: e.weekday,
        open: e.open,
        close: e.close,
      } as WorkingHour));
    } catch (err) {
      throw err;
    }
  }

  async add(_workingHour: WorkingHour): Promise<WorkingHour> {
    try {
      await this.CONN.query(
        `INSERT INTO ${this.tableName}(id, restaurant, weekday, open, close)
        VALUES ($1, $2, $3, $4, $5)`,
        [
          _workingHour.id,
          _workingHour.restaurant,
          _workingHour.weekDay,
          _workingHour.open,
          _workingHour.close,
        ]
      );
      return {
        ..._workingHour,
        restaurant: undefined,
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

  async deleteAll(_idRestaurant: string): Promise<void> {
    try {
      await this.CONN.query(
        `DELETE
        FROM ${this.tableName}
        WHERE restaurant=$1`,
        [_idRestaurant],
      );
    } catch (err) {
      throw err;
    }
  }
}
