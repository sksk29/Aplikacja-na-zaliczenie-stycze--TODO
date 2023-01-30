export interface IHttpClientResponse<T> {
  data: T;
  status: number;
  headers: Record<string, unknown>;
}
