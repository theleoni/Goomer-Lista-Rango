import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { RestaurantDao as Dao } from '../daos/restaurant';
import { RestaurantValidation } from './restaurant.validation';
import { ProductDao } from '../daos/product';

import { BadRequestError } from '../errorTypes';
import { NotAcceptableError } from '../errorTypes'

const dao = new Dao();
const productDao = new ProductDao();

export class RestaurantController {

  /**
  * <h1>GET /many</h1>
  * Get a simplified list of all data
  */
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await dao.list();
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  /**
  * <h1>GET /one/:id</h1>
  * Get a unique register based on their ID
  */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params as ParamsDictionary;
      const response = await dao.get(_id);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  /**
  * <h1>POST /</h1>
  * Add an new register
  */
  async add(req: Request, res: Response, next: NextFunction) {
    try {
      // validate body data
      const { error } = RestaurantValidation.validate(req.body);
      if (error) {
        throw new BadRequestError(error.message);
      }

      const response = await dao.add(req.body);
      return res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  /**
  * <h1>PUT /:id</h1>
  * Change an register based on their ID
  */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // validate body data
      const { error: bodyError } = RestaurantValidation.validate(req.body);
      if (bodyError) {
        throw new BadRequestError(bodyError.message);
      }

      const { _id } = req.params as ParamsDictionary;
      const response = await dao.update(_id, req.body);
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  /**
  * <h1>DELETE /:id</h1>
  * Delete an register based on their ID
  */
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params as ParamsDictionary;

      const productList = await productDao.list(_id);
      if (productList.length > 0) {
        throw new NotAcceptableError('This restaurant have products. Delete them before.')
      }

      await dao.delete(_id);
      return res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

}
