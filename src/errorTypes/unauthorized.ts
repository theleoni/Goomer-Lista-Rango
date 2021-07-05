import { CustomError } from './index';
export default class UnauthorizedError extends Error implements CustomError {

  _name: string;
  _statusCode: number;
  _details: string|object;

  constructor(message: string, details?: string | object) {
    super(message || 'Unauthorized');
    this._name = 'UnauthorizedError';
    this._statusCode = 401;
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
