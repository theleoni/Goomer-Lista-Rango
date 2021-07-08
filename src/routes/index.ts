import { Router } from 'express';
// import passport from 'passport';
import RestaurantRouter from './restaurant';
import ProductRouter from './product';

const router = Router();

// router.use('/auth', AuthRouter);
//passport.authenticate('jwt', {session: false}),
router.use('/restaurant', RestaurantRouter);
router.use('/product', ProductRouter);

// Export the base-router
export default router;
