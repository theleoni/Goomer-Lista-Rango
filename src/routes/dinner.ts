import { Router } from 'express';
import { DinnerController as Controller } from '../controllers/dinner';

const router = Router();
const controller = new Controller();

/**
 * Route to list all data
 */
router.get('/', controller.list);

/**
 * Route to get an especifique data by their ID
 */
router.get('/:_id', controller.get);

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
