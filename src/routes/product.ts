import { Router } from 'express';
import { ProductController as Controller } from '../controllers/product';

const router = Router();
const controller = new Controller();

/**
 * Route to list all data
 */
router.get('/many/:_id', controller.list);

/**
 * Route to get an especifique data by their ID
 */
router.get('/one/:_id', controller.get);

/**
 * Route to add new data
 */
router.post('', controller.add);

/**
 * Route to change an especifique data by their ID
 */
router.put('/:_id', controller.update);

/**
 * <Route to delete an especifique data by their ID
 */
router.delete('/:_id', controller.delete);

export default router;
