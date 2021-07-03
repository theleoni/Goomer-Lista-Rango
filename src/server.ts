import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response } from 'express';
// import  from 'cookie-parser';
import BaseRouter from './routes';

import errorMiddleware from './middleware/errorMiddleware';

// Init Auth service
require('./services/authorize');

// Init express
const app = express();


// Basic Express config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Catch and handle an error as it deserves
app.use(errorMiddleware);
// app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

// Health Check
app.get('/', (req: Request, res: Response) => {
	return res.status(200).send(`I'm okay, thank you for asking`);
})

// Add APIs routes/paths
app.use('/', BaseRouter);

// // Print API errors
// app.use((err: Error, req: Request, res: Response) => {
// 	console.error(err.message, err);
// 	return res.status(400).json({
// 		error: err.message,
// 	});
// });

// Export express instance
export default app;
