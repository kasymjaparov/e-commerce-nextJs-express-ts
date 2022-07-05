/**
 * Кастомное исключение
 * @ClientError
 * @UnAuthorizedError
 * @ValidationError
 * @Forbidden
 */
class ApiError extends Error {
  statusCode: number;
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
  static ClientError(msg) {
    return new ApiError(msg, 400);
  }
  static UnAuthorizedError(msg) {
    return new ApiError(msg, 401);
  }
  static ValidationError(msg) {
    return new ApiError(msg, 422);
  }
  static Forbidden(msg) {
    return new ApiError(msg, 403)
  }
}
export default ApiError