import { CustomError } from './index';
export default class NotFoundError extends Error implements CustomError {

  _name: string;
  _statusCode: number;
  _details: string|object;

  constructor(message: string, details?: string | object) {
    super(message || 'NotFound');
    this._name = 'NotFoundError';
    this._statusCode = 404;
    this._details = details;
  }

  get name(): string {
    return this._name;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get details(): string {
    return this._details && String(this._details);
  }
}
