export const handleFetch = (response: any) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject('Response was not OK');
};
