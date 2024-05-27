import env from './env';
import { ILogin } from './Inreface';

export async function login(formData: ILogin) {
  const auth = btoa(`${env.customer.clientId}:${env.customer.clientSecret}`);
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', `Basic ${auth}`);

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', formData.email.toLowerCase());
  body.append('password', formData.password);
  body.append('scope', env.customer.scopes.join(' '));

  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };

  const answer = await fetch(
    `${env.authURL}/oauth/${env.projectKey}/customers/token`,
    requestOptions
  ).then((response) => response.json());
  if (answer.expires_in) {
    const currenDateValue = new Date().getTime() / 1000;
    answer.expires_in = currenDateValue + answer.expires_in;
    answer.email = formData.email;
  }

  return answer;
}

export default login;
