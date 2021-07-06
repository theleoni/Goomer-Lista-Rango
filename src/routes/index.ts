import { Router } from 'express';
// import passport from 'passport';
import RestaurantRouter from './restaurant';

const router = Router();

// router.use('/auth', AuthRouter);
//passport.authenticate('jwt', {session: false}),
router.use('/restaurant', RestaurantRouter);

// Export the base-router
export default router;
