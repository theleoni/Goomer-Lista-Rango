import { Restaurant } from '../types';
import { DB } from '../models/index';
import { v4 as uuidv4 } from 'uuid';

import { NotFoundError } from '../errorTypes';

export class RestaurantDao {

	/**
	*
	*/
	async list(): Promise<Restaurant[]> {
		const data = await DB.Models.Restaurant.list();
		return data;
	}

	/**
	* @param id
	*/
	async get(id: string): Promise<Restaurant | null> {
		const data = await DB.Models.Restaurant.get(id);
		if (data) {
			data.workingHours = await DB.Models.WorkingHour.list(id);
		}
		return data;
	}

	/**
	*
	* @param restaurant
	*/
	async add(restaurant: Restaurant): Promise<Restaurant> {
		const data = await DB.Models.Restaurant.add({
			id: uuidv4(),
			...restaurant,
		});
		data.workingHours = await Promise.all(restaurant.workingHours.map(hour => {
			return DB.Models.WorkingHour.add({
				id: uuidv4(),
				restaurant: data.id,
				weekDay: hour.weekDay,
				open: hour.open,
				close: hour.close,
			});
		}));
		return data;
	}

	/**
	* @param restaurant
	* @param id
	*/
	async update(id: string, restaurant: Restaurant): Promise<Restaurant> {
		if (!await DB.Models.Restaurant.get(id)) {
			throw new NotFoundError('This record does not exist. Add it first.')
		}

		// remove all sub items (add the updated later)
		await DB.Models.WorkingHour.deleteAll(id);

		// update the main data
		const data = await DB.Models.Restaurant.update(id, restaurant);

		// add sub items
		data.workingHours = await Promise.all(restaurant.workingHours.map(hour => {
			return DB.Models.WorkingHour.add({
				id: uuidv4(),
				restaurant: data.id,
				weekDay: hour.weekDay,
				open: hour.open,
				close: hour.close,
			});
		}));
		return data;
	}

	/**
	*
	* @param id
	*/
	async delete(id: string): Promise<void> {
		await DB.Models.WorkingHour.deleteAll(id);
		await DB.Models.Restaurant.delete(id);
	}
}
