import store from '../../redux/store/store';
import { formattedAppTokenNew } from './getAppToken';

export async function createAnonymousToken() {
  const scope = import.meta.env.VITE_USR_SCOPES;
  const auth = btoa(
    `${import.meta.env.VITE_USR_CLIENT_ID}:${import.meta.env.VITE_USR_CLIENT_SECRET}`
  );
  const headers = new Headers({
    Authorization: `Basic ${auth}`,
  });
  const answer = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials&scope=${scope}`,
    {
      method: 'POST',
      headers,
    }
  );
  const answerJSON = await answer
    .json()
    .then((tokenNew) => formattedAppTokenNew(tokenNew));
  return answerJSON;
}

export async function getAnonymousToken() {
  const currentDateValue = new Date().getTime() / 1000;
  const tokenStore = store.getState().appSlice.anonymousToken;
  if (tokenStore.access_token && tokenStore.expires_in > currentDateValue) {
    return tokenStore;
  }

  const newToken = await createAnonymousToken();
  return newToken;
}
