export default class NotAcceptableError extends Error {
  constructor(message) {
    super(message || 'NotAcceptable');
    this.name = 'NotAcceptableError';
    this.statusCode = 406;
    this.details = {};
  }
}
