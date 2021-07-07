import { Pool, QueryResult } from 'pg';
import { Restaurant } from '../types';
import { Model } from './index';

export class RestaurantModel implements Model {

  tableName = 'restaurant';
  CONN: Pool;

  constructor(conn: Pool) {
    this.CONN = conn;
  }

  async list(): Promise<Restaurant[]> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT id, name, address
        FROM ${this.tableName}`,
      );
      return data.rows.map(e => ({
        id: e.id,
        name: e.name,
        fullAddress: e.address || undefined,
      } as Restaurant));
    } catch (err) {
      throw err;
    }
  }

  async get(_id: string): Promise<Restaurant> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT *
        FROM ${this.tableName}
        WHERE id = $1 LIMIT 1`,
        [_id],
      );

      const {
        id,
        picture,
        name,
        address
      } = (data.rows.length && data.rows[0]) || {};

      return {
        id,
        picture: picture || undefined,
        name,
        fullAddress: address || undefined
      } as Restaurant;
    } catch (err) {
      throw err;
    }
  }

  async add(_restaurant: Restaurant): Promise<Restaurant> {
    try {
      await this.CONN.query(
        `INSERT INTO ${this.tableName}(id, picture, name, address)
        VALUES ($1, $2, $3, $4)`,
        [
          _restaurant.id,
          _restaurant.picture,
          _restaurant.name,
          _restaurant.fullAddress,
        ]
      );
      return _restaurant;
    } catch (err) {
      throw err;
    }
  }

  async update(_id: string, _restaurant: Restaurant): Promise<Restaurant> {
    try {
      await this.CONN.query(
        `UPDATE ${this.tableName}
        SET $2, name=$3, address=$4
        WHERE id=$1`,
        [
          _id,
          _restaurant.picture,
          _restaurant.name,
          _restaurant.fullAddress,
        ]
      );
      return {
        ..._restaurant,
        id: _id,
      } as Restaurant;
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
}
