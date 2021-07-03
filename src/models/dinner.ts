import { Pool, QueryResult } from 'pg';
import { Dinner } from '../types';
import { Model } from './index';

export class DinnerModel implements Model {

  tableName = 'dinner';
  CONN: Pool;

  constructor(conn: Pool) {
    this.CONN = conn;
  }


  async list(): Promise<Dinner[]> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT id, name, address FROM ${this.tableName}`,
      );
      return data.rows.map(e => {
        return {
          id: e.id,
          picture: e.picture,
          name: e.name,
          fullAddress: e.address,
        } as Dinner;
      });
    } catch (err) {
      throw err;
    }
  }

  async get(_id: string): Promise<Dinner> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT * FROM ${this.tableName} WHERE id = $1 LIMIT 1`, [_id],
      );
      const { id, picture, name, address } = data.rows[0];
      return {
        id, picture, name, fullAddress: address
      } as Dinner;
    } catch (err) {
      throw err;
    }
  }

  async add(_dinner: Dinner): Promise<Dinner> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `INSERT INTO ${this.tableName}(id, picture, name, address) VALUES ($1, $2, $3, $4)`,
        [
          _dinner.id,
          _dinner.picture,
          _dinner.name,
          _dinner.fullAddress,
        ]
      );
      return _dinner;
    } catch (err) {
      throw err;
    }
  }

  async update(_id: string, _dinner: Dinner): Promise<Dinner> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `UPDATE ${this.tableName} SET picture=$2, name=$3, address=$4 WHERE id=$1`,
        [
          _id,
          _dinner.picture,
          _dinner.name,
          _dinner.fullAddress,
        ]
      );
      return {
        _id,
        ..._dinner,
      } as Dinner;
    } catch (err) {
      throw err;
    }
  }

  async delete(_id: string): Promise<void> {
    try {
      await this.CONN.query(
        `DELETE FROM ${this.tableName} WHERE id=$1`,
        [_id],
      );
    } catch (err) {
      throw err;
    }
  }
}
