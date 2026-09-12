export type ErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "INTERNAL_ERROR";
export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}
export const appErrors = {
  validation: (message = "The request is invalid") =>
    new AppError("VALIDATION_ERROR", message, 400),
  notFound: (message = "The requested resource was not found") =>
    new AppError("NOT_FOUND", message, 404),
  conflict: (message = "The request conflicts with existing data") =>
    new AppError("CONFLICT", message, 409),
  unauthorized: (message = "Authentication is required") =>
    new AppError("UNAUTHORIZED", message, 401),
  forbidden: (message = "You do not have permission to perform this action") =>
    new AppError("FORBIDDEN", message, 403),
  internal: () => new AppError("INTERNAL_ERROR", "An unexpected error occurred", 500),
};
