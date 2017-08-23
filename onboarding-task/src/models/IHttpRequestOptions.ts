export interface IHttpRequestOptions {
  method: string;
  url?: string;
  headers?: Headers;
}

interface Headers {
  [key: string]: any;
}
