import { Restaurant } from '../types';
import { DB } from '../models/index';
import { v4 as uuidv4 } from 'uuid';

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
		data.workingHours = await DB.Models.WorkingHour.list(id);
		return data;
	}

	/**
	*
	* @param dinner
	*/
	async add(dinner: Restaurant): Promise<Restaurant> {
		const data = await DB.Models.Restaurant.add({
			id: uuidv4(),
			...dinner,
		});
		await Promise.all(data.workingHours.map(hour => {
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
	* @param dinner
	* @param id
	*/
	async update(id: string, dinner: Restaurant): Promise<Restaurant> {
		//validate working hour
		const data = await DB.Models.Restaurant.update(id, dinner);
		//update working hour
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
