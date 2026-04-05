export const BASE_URL = 'https://fintech-backend-427x.onrender.com/api/';

const TIMEOUT_MS = 50000;

const buildHeaders = (extraHeaders = {}) => ({
  'Content-Type': 'application/json',
  ...extraHeaders,
});

const withTimeout = (promise: Promise<any>, ms: number) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject({ status: 504 }), ms)),
  ]);

const parseResponse = async (res: Response) => {
  if (res.status === 401) {
    // handle logout if needed
  }
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();
  if (res.ok) return { status: res.status, ...data };
  return Promise.reject({ status: res.status, ...data });
};

const request = (url: string, options: any = {}, urlPrefix = BASE_URL) =>
  withTimeout(fetch(urlPrefix + url, options), TIMEOUT_MS).then(res =>
    parseResponse(res as Response)
  );

export const doGet = (url: string, headers: any = {}) =>
  request(url, { method: 'GET', headers: buildHeaders(headers) });

export const doPost = (url: string, body?: any, headers: any = {}) =>
  request(url, {
    method: 'POST',
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  });

export const doPatch = (url: string, body?: any, headers: any = {}) =>
  request(url, {
    method: 'PATCH',
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  });

export const doDelete = (url: string, body?: any, headers: any = {}) =>
  request(url, {
    method: 'DELETE',
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  });

export const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
