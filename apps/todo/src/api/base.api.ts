import { AxiosHttpClient } from '../http';
import { HttpClient } from '../http/http-client';

export abstract class BaseApi {
  private readonly http = new AxiosHttpClient({
    baseURL: 'http://localhost:3000/api'
  });

  protected get httpClient(): HttpClient {
    return this.http;
  }
}
