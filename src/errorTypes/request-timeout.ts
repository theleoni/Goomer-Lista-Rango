export default class RequestTimeoutError extends Error {
  constructor(message) {
    super(message || 'RequestTimeout');
    this.name = 'RequestTimeoutError';
    this.statusCode = 408;
    this.details = {};
  }
}
