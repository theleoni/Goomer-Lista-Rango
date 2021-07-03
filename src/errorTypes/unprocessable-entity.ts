export default class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message || 'UnprocessableEntity');
    this.name = 'UnprocessableEntityError';
    this.statusCode = 422;
    this.details = {};
  }
}
