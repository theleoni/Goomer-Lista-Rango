export default class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'Forbidden');
    this.name = 'ForbiddenError';
    this.statusCode = 403;
    this.details = {};
  }
}
