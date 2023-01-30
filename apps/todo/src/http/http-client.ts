import { IHttpClientResponse } from '../ts';

export type THttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export abstract class HttpClient<
  TInstance = unknown,
  TCreateInstanceConfig = unknown,
  TRequestConfig extends Record<string | number | symbol, unknown> = Record<string, unknown>
> {
  private readonly instance: TInstance;

  constructor(config: TCreateInstanceConfig) {
    this.instance = this.makeInstance(config);
  }

  protected abstract makeInstance(config: TCreateInstanceConfig): TInstance;

  protected abstract makeRequest<T = unknown>(
    method: THttpMethod,
    url: string,
    config?: TRequestConfig,
    data?: unknown
  ): Promise<IHttpClientResponse<T>>;

  get instanceRef(): Readonly<TInstance> {
    return this.instance;
  }

  public get<T = unknown>(url: string, config?: TRequestConfig): Promise<IHttpClientResponse<T>> {
    return this.makeRequest<T>('GET', url, config);
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig
  ): Promise<IHttpClientResponse<T>> {
    return this.makeRequest<T>('POST', url, config, data);
  }

  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig
  ): Promise<IHttpClientResponse<T>> {
    return this.makeRequest<T>('PUT', url, config, data);
  }

  public patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: TRequestConfig
  ): Promise<IHttpClientResponse<T>> {
    return this.makeRequest<T>('PATCH', url, config, data);
  }

  public delete<T = unknown>(
    url: string,
    config?: TRequestConfig
  ): Promise<IHttpClientResponse<T>> {
    return this.makeRequest<T>('DELETE', url, config);
  }

  public head<T = unknown>(url: string, config?: TRequestConfig): Promise<IHttpClientResponse<T>> {
    return this.makeRequest<T>('HEAD', url, config);
  }

  public options<T = unknown>(
    url: string,
    config?: TRequestConfig
  ): Promise<IHttpClientResponse<T>> {
    return this.makeRequest<T>('OPTIONS', url, config);
  }
}
