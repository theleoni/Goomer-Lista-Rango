import dotenv from 'dotenv';

// Set the env file
const result = dotenv.config({
	// path: './env/development.env',
	path: '.env',
});

if (result.error) {
	throw result.error;
}
