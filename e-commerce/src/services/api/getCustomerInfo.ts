import env from './env';
import { getAppToken } from './getAppToken';
import { getUserToken } from './getUserToken';

async function customerInfo(email: string, token: string) {
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const requestOptions = {
    method: 'GET',
    headers,
  };
  const searchString = encodeURIComponent(`email="${email}"`);
  const answer = await fetch(
    `${env.apiURL}/${env.projectKey}/customers?limit=1&offset=0&where=${searchString}`,
    requestOptions
  );
  const answerJSON = await answer.json();
  return answerJSON;
}

export async function getCustomerInfo() {
  const appToken = await getAppToken();
  if (!appToken) return undefined;
  const userToken = await getUserToken();
  if (!userToken) return undefined;
  const result = await customerInfo(
    userToken.email.toLowerCase(),
    appToken.access_token
  );
  if (!result.total || result.results.length !== 1) return undefined;

  return result.results[0];
}

export default getCustomerInfo;
