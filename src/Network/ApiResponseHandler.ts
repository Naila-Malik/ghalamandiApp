export interface ApiResponseHandler<T> {
  message: string;
  data: T;
  success: boolean;
  statusCode?: number;
  token?: string;
}
