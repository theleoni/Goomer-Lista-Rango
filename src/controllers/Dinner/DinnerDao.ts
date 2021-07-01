import { Dinner } from '../../models/index';
import { DB } from '../index';

export class DinnerController {

	/**
	 *
	 */
	public async list(): Promise<Dinner[]> {
		try {
			const data = await DB.Models.Dinner.list();
			return data;
		} catch (err) {
			throw err;
		}
	}


	/**
	 * @param id
	 */
	public async get(id: string): Promise<Dinner | null> {
		try {
			const data = await DB.Models.Dinner.get(id);
			return data;
		} catch (err) {
			throw err;
		}
	}

	/**
	 *
	 * @param dinner
	 */
	public async add(dinner: Dinner): Promise<Dinner> {
		try {
			const data = await DB.Models.Dinner.add(dinner);
			return data;
		} catch (err) {
			throw err;
		}
	}


	/**
	 * @param dinner
	 * @param id
	 */
	public async update(id: string, dinner: Dinner): Promise<Dinner> {
		try {
			const data = await DB.Models.Dinner.update(id, dinner);
			return data;
		} catch (err) {
			throw err;
		}
	}


	/**
	 *
	 * @param id
	 */
	public async delete(id: string): Promise<void> {
		try {
			await DB.Models.Dinner.delete(id);
		} catch (err) {
			throw err;
		}
	}
}
