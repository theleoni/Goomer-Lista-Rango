import { Request, Response, NextFunction} from 'express';
import { CustomError } from '../errorTypes/index';

const {
  env: { NODE_ENV },
} = process;

const getErrorName = (name: string) => {
  const isGenericError = !name || name === 'Error';
  return isGenericError ? 'InternalServerError' : name;
};

const isError = (error: any) => {
  return error instanceof Error;
};

export default (error: CustomError, _request: Request, response: Response, next: NextFunction) => {
  if (!isError(error)) {
    return next();
  };

  const {
    statusCode,
    message,
    details,
  } = error || {
    statusCode: 500,
    message: 'Internal Server Error',
  };

  const errorBody = {
    message,
    statusCode,
    error: getErrorName(error.name),
    details,
    stack: (
      ['development'].includes(NODE_ENV)
      ? error.stack
      : undefined
    )
  };

  return response.status(statusCode).json(errorBody);
};
