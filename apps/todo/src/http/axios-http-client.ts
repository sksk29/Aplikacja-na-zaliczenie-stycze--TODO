import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
  CreateAxiosDefaults
} from 'axios';
import { IHttpClientResponse } from '../ts';
import { HttpClient, THttpMethod } from './http-client';

export class AxiosHttpClient extends HttpClient<
  AxiosInstance,
  CreateAxiosDefaults,
  Partial<AxiosRequestConfig>
> {
  protected makeInstance(config: CreateAxiosDefaults): AxiosInstance {
    return Axios.create({
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    });
  }

  protected async makeRequest<T = unknown>(
    method: THttpMethod,
    url: string,
    config: Partial<AxiosRequestConfig> = {},
    data: unknown = undefined
  ): Promise<IHttpClientResponse<T>> {
    const configCopy = { ...config };

    let cancelSource: CancelTokenSource | undefined;

    if (!config.cancelToken) {
      cancelSource = Axios.CancelToken.source();
      configCopy.cancelToken = cancelSource.token;
    }

    const {
      data: responseData,
      headers,
      status
    } = await this.instanceRef.request<T>({
      ...configCopy,
      method,
      url,
      data
    });

    if (cancelSource) {
      cancelSource.cancel();
    }

    return {
      data: responseData,
      headers,
      status
    };
  }
}
