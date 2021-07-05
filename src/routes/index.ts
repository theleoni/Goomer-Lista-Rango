import { Router } from 'express';
// import passport from 'passport';
import DinnerRouter from './dinner';

const router = Router();

// router.use('/auth', AuthRouter);
//passport.authenticate('jwt', {session: false}),
router.use('/dinner', DinnerRouter);

// Export the base-router
export default router;
