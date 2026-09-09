export interface AppError {
  code: string;
  message: string;
  field?: string;
  details?: unknown;
}
