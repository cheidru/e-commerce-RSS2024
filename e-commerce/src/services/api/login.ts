import { ILogin } from '../../types/User/Interface';
import { AppMessage } from './getAppToken';
import { AppDispatch } from '../../redux/store/store';
import { AuthToken, setAuthToken } from '../../redux/store/userSlice';
import { getCart } from './cart';

export async function login(formData: ILogin, dispatch: AppDispatch) {
  const auth = btoa(
    `${import.meta.env.VITE_USR_CLIENT_ID}:${import.meta.env.VITE_USR_CLIENT_SECRET}`
  );
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', `Basic ${auth}`);

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', formData.email.toLowerCase());
  body.append('password', formData.password);
  body.append('scope', import.meta.env.VITE_USR_SCOPES);

  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/token`,
    requestOptions
  )
    .then((response) => response.json())
    .then((userToken) => {
      if (userToken.errors) {
        const result: AppMessage<undefined> = {
          isError: true,
          message: userToken.message,
        };
        return result;
      }
      const newToken = { ...userToken };
      const currentDateValue = new Date().getTime() / 1000;
      newToken.expires_in = currentDateValue + userToken.expires_in;
      newToken.email = formData.email;
      const result: AppMessage<AuthToken> = {
        isError: false,
        thing: newToken,
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<undefined> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });

  if (!answer.isError && answer.thing) {
    dispatch(setAuthToken(answer.thing));
    getCart(dispatch);
  }

  return answer;
}

export default login;
