import NotFoundError from './not-found';
// import UnauthorizedError from './unauthorized';
// import ForbiddenError from './forbidden';
// import NotAcceptableError from './not-acceptable';
// import BadRequestError from './bad-request';
// import NotImplementedError from './not-implemented';
// import UnprocessableEntityError from './unprocessable-entity';
// import RequestTimeoutError from './request-timeout';

export interface CustomError {
  readonly name: string;
  readonly statusCode: number;
  readonly details: string;
  readonly message?: string;
  readonly stack?: any;
}

export {
  NotFoundError,
  // UnauthorizedError,
  // ForbiddenError,
  // NotAcceptableError,
  // BadRequestError,
  // NotImplementedError,
  // UnprocessableEntityError,
  // RequestTimeoutError,
};
