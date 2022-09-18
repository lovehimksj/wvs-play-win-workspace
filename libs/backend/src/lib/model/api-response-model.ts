export interface ApiResponseModel<T> {
  data: T;
  status: number;
  message: string;
}
