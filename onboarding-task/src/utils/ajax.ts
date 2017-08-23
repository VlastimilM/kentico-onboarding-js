export interface IResponse {
  ok: boolean;
  json: () => Promise<any>;
}

export const handleFetch = (response: IResponse) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject('Response was not OK');
};

