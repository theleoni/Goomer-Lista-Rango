import { Dinner } from '../types';
import { DB } from '../models/index';
import { v4 as uuidv4 } from 'uuid';

export class DinnerDao {

	/**
	*
	*/
	async list(): Promise<Dinner[]> {
		const data = await DB.Models.Dinner.list();
		return data;
	}


	/**
	* @param id
	*/
	async get(id: string): Promise<Dinner | null> {
		const data = await DB.Models.Dinner.get(id);
		data.workingHours = await DB.Models.WorkingHour.list(id);
		return data;
	}

	/**
	*
	* @param dinner
	*/
	async add(dinner: Dinner): Promise<Dinner> {
		const data = await DB.Models.Dinner.add({
			id: uuidv4(),
			...dinner,
		});
		await Promise.all(data.workingHours.map(hour => {
			return DB.Models.WorkingHour.add({
				id: uuidv4(),
				dinner: data.id,
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
	async update(id: string, dinner: Dinner): Promise<Dinner> {
		//validate working hour
		const data = await DB.Models.Dinner.update(id, dinner);
		//update working hour
		return data;
	}


	/**
	*
	* @param id
	*/
	async delete(id: string): Promise<void> {
		await DB.Models.WorkingHour.deleteAll(id);
		await DB.Models.Dinner.delete(id);
	}
}
