/**
 * Universal API Response Format matching Backend ApiResponse<T>
 *
 * Backend Definition:
 * Ok(T data, string? message = null) => new ApiResponse<T> { Success = true, Data = data, Message = message };
 * Fail(string message)               => new ApiResponse<T> { Success = false, Message = message };
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string | null;
  status?: boolean | number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  data?: unknown;
  status?: boolean | number;
}
