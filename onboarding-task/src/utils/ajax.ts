export interface IResponse {
  readonly ok: boolean;
  readonly json: () => Promise<any>;
}

export interface IHttpRequestOptions {
  readonly method: string;
  readonly url?: string;
  readonly headers?: Headers;
}

interface Headers {
  readonly [key: string]: any;
}

export type FetchFunction = (route: string, options: IHttpRequestOptions) => Promise<IResponse>;

export const handleFetch = (response: IResponse) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject('Response was not OK');
};

