import { Pool, QueryResult } from 'pg';
import { Product } from '../types';
import { Model } from './index';

export class ProductModel implements Model {

  tableName = 'product';
  CONN: Pool;

  constructor(conn: Pool) {
    this.CONN = conn;
  }

  async list(_idRestaurant: string): Promise<Product[]> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT id, restaurant, name, price, category
        FROM ${this.tableName}
        WHERE restaurant = $1`,
        [_idRestaurant],
      );
      return data.rows.map(e => ({
        id: e.id,
        restaurant: e.restaurant,
        name: e.name,
        price: e.price,
        category: e.category,
      } as Product));
    } catch (err) {
      throw err;
    }
  }

  async get(_id: string): Promise<Product> {
    try {
      const data: QueryResult<any> = await this.CONN.query(
        `SELECT *
        FROM ${this.tableName}
        WHERE id = $1 LIMIT 1`,
        [_id],
      );

      const {
        id,
        restaurant,
        picture,
        name,
        price,
        category,
        in_promotion: inPromotion,
        promotion_description: promotionDescription,
        promotion_price: promotionPrice,
      } = (data.rows.length && data.rows[0]) || {};

      return {
        id,
        restaurant,
        picture: picture || undefined,
        name,
        price,
        category,
        promotion: inPromotion ? {
          description: promotionDescription,
          price: promotionPrice,
        } : undefined,
      } as Product;
    } catch (err) {
      throw err;
    }
  }

  async add(_product: Product): Promise<Product> {
    try {

      const inPromotion = Boolean(_product.promotion
      && _product.promotion.description
      && _product.promotion.price);

      await this.CONN.query(
        `INSERT INTO ${this.tableName}(id, restaurant, picture, name, price, category, in_promotion, promotion_description, promotion_price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          _product.id,
          _product.restaurant,
          _product.picture,
          _product.name,
          _product.price,
          _product.category,
          inPromotion,
          inPromotion ? _product.promotion.description : null,
          inPromotion ? _product.promotion.price : null,
        ]
      );
      return _product;
    } catch (err) {
      throw err;
    }
  }

  async update(_id: string, _product: Product): Promise<Product> {
    try {

      const inPromotion = _product.promotion
      && _product.promotion.description
      && _product.promotion.price;

      await this.CONN.query(
        `UPDATE ${this.tableName}
        SET restaurant=$2, picture=$3, name=$4, price=$5, category=$6, in_promotion=$7, promotion_description=$8, promotion_price=$9
        WHERE id=$1`,
        [
          _id,
          _product.restaurant,
          _product.picture,
          _product.name,
          _product.price,
          _product.category,
          inPromotion,
          inPromotion ? _product.promotion.description : null,
          inPromotion ? _product.promotion.price : null,
        ]
      );
      return {
        ..._product,
        id: _id,
      } as Product;
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
