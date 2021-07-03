import { Dinner } from '../types';
import { DB } from './index';
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
		return data;
	}


	/**
	* @param dinner
	* @param id
	*/
	async update(id: string, dinner: Dinner): Promise<Dinner> {
		const data = await DB.Models.Dinner.update(id, dinner);
		return data;
	}


	/**
	*
	* @param id
	*/
	async delete(id: string): Promise<void> {
		await DB.Models.Dinner.delete(id);
	}
}
