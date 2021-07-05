import { CustomError } from './index';
export default class UnprocessableEntityError extends Error implements CustomError {

  _name: string;
  _statusCode: number;
  _details: string|object;

  constructor(message: string, details?: string | object) {
    super(message || 'UnprocessableEntity');
    this._name = 'UnprocessableEntityError';
    this._statusCode = 422;
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
