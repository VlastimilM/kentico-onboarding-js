export interface IResponse {
  ok: boolean;
  json: () => Promise<any>;
}

export interface IHttpRequestOptions {
  method: string;
  url?: string;
  headers?: Headers;
}

interface Headers {
  [key: string]: any;
}

export type FetchFunction = (route: string, options: IHttpRequestOptions) => Promise<IResponse>;

export const handleFetch = (response: IResponse) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject('Response was not OK');
};

