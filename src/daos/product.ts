import { Product } from '../types';
import { DB } from '../models/index';
import { v4 as uuidv4 } from 'uuid';

import { NotFoundError } from '../errorTypes';

export class ProductDao {

	/**
	*
	*/
	async list(id: string): Promise<Product[]> {
		const data = await DB.Models.Product.list(id);
		return data;
	}

	/**
	* @param id
	*/
	async get(id: string): Promise<Product | null> {
		const data = await DB.Models.Product.get(id);
		if (data && data.promotion) {
			data.promotion.promotionHours = await DB.Models.ProductPromotionHour.list(id);
		}
		return data;
	}

	/**
	*
	* @param product
	*/
	async add(product: Product): Promise<Product> {
		const data = await DB.Models.Product.add({
			id: uuidv4(),
			...product,
		});
		if (product.promotion) {
			data.promotion.promotionHours = await Promise.all(product.promotion.promotionHours.map(hour => {
				return DB.Models.ProductPromotionHour.add({
					id: uuidv4(),
					product: data.id,
					weekDay: hour.weekDay,
					begin: hour.begin,
					end: hour.end,
				});
			}));
		}
		return data;
	}

	/**
	* @param product
	* @param id
	*/
	async update(id: string, product: Product): Promise<Product> {
		if (!await DB.Models.Product.get(id)) {
			throw new NotFoundError('This record does not exist. Add it first.')
		}

		// remove all sub items (add the updated later)
		await DB.Models.ProductPromotionHour.deleteAll(id);

		// update the main data
		const data = await DB.Models.Product.update(id, product);

		// add sub items
		if (product.promotion) {
			data.promotion.promotionHours = await Promise.all(product.promotion.promotionHours.map(hour => {
				return DB.Models.ProductPromotionHour.add({
					id: uuidv4(),
					product: data.id,
					weekDay: hour.weekDay,
					begin: hour.begin,
					end: hour.end,
				});
			}));
		}
		return data;
	}

	/**
	*
	* @param id
	*/
	async delete(id: string): Promise<void> {
		await DB.Models.ProductPromotionHour.deleteAll(id);
		await DB.Models.Product.delete(id);
	}
}
