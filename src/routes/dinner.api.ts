import { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { DinnerController } from '../controllers';

// Init shared
const router = Router();
const dinnerController = new DinnerController();


/******************************************************************************
 *                      Get All Products - "GET /api/product/read"
 ******************************************************************************/

router.get('/', async (req: Request, res: Response) => {
	const response = await dinnerController.list();
	return res.status(200).send(response);
});


/******************************************************************************
 *                      Get single Product - "GET /api/product/read/:_id"
 ******************************************************************************/

router.get('/:_id', async (req: Request, res: Response) => {
	const { _id } = req.params as ParamsDictionary;
	const response = await dinnerController.get(_id);
	return res.status(200).send(response);
});


/******************************************************************************
 *                       Add - "POST /api/product/add"
 ******************************************************************************/

router.post('', async (req: Request, res: Response) => {
	const response = await dinnerController.add(req.body);
	return res.status(201).send(response);
});


/******************************************************************************
 *                       Update - "PUT /api/product/update/:_id"
 ******************************************************************************/

router.put('/:_id', async (req: Request, res: Response) => {
	const { _id } = req.params as ParamsDictionary;
	const response = await dinnerController.update(_id, req.body);
	return res.status(200).send(response);
});


/******************************************************************************
 *                    Delete - "DELETE /api/product/delete/:_id"
 ******************************************************************************/

router.delete('/:_id', async (req: Request, res: Response) => {
	const { _id } = req.params as ParamsDictionary;
	await dinnerController.delete(_id);
	return res.status(200).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
