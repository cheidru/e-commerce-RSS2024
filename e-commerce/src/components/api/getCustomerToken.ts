import { IRegister, IAddress, ILogin } from './Inreface';
import { FormDataLogin, FormDataRegister } from '../forms/validationRulesInput';
// import { resolve } from 'path';
// import store from '../../redux/store/store';
// import { useAppDispatch } from '../../redux/hooks';
// import { setAppToken } from '../../redux/store/appSlice';

// const clientID = 'MXjx0D7Jw1Cmi0ZqSHWq2MUJ';
// const secret = 'HQk1sjqtKnouVW4uQ9ofT_6PGhL66lXT';
// const scope = 'manage_project:e-commerce-asinc';
// const region = 'auth.us-central1.gcp.commercetools.com';
export const apiURL = 'https://api.us-central1.gcp.commercetools.com';
export const authURL = 'https://auth.us-central1.gcp.commercetools.com';

// Password flow for global Customers
// https://docs.commercetools.com/api/authorization#password-flow
// https://docs.commercetools.com/getting-started/make-first-api-call#get-your-access-token

async function createAccessToken() {
  const headers = new Headers({
    Authorization: `Basic ${btoa('MXjx0D7Jw1Cmi0ZqSHWq2MUJ:HQk1sjqtKnouVW4uQ9ofT_6PGhL66lXT')}`,
  });
  const answer = await fetch(
    'https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials&scope=manage_project:e-commerce-asinc',
    {
      method: 'POST',
      headers,
    }
  );
  const answerJSON = await answer.json();
  return answerJSON;
}

export async function getAccessToken() {
  // const appTokenStore = store.getState().appSlice.authToken;
  // // console.log(appTokenStore)
  // if (appTokenStore) {
  //   console.log('getAccessToken, appTokenStore', appTokenStore);
  //   return appTokenStore;
  // }

  const newToken = await createAccessToken();
  // console.log('getAccessToken, newToken', newToken);
  return newToken;
}

export async function register(customer: object, token: string) {
  const answer = await fetch(
    'https://api.us-central1.gcp.commercetools.com/e-commerce-asinc/me/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    }
  );
  const answerJSON = await answer.json();
  return answerJSON;
}

// https://docs.commercetools.com/api/projects/me-profile#create-sign-up-customer

export function formattedDataRegister(data: FormDataRegister): IRegister {
  const addresses: IAddress[] = [data.address];
  if (data.addressForInvoice) {
    addresses.push(data.addressInvoice);
  }
  const formData: IRegister = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    // dateOfBirth: new Date(data.dateOfBirth),
    // ddresses: addresses,
  };

  return formData;
}

export async function registerNewCustomer(formData: IRegister) {
  const answer = getAccessToken().then((result) =>
    register(formData, result.access_token)
  );

  return answer;
}

export function formattedDataLogin(data: FormDataLogin): ILogin {
  const formData: ILogin = {
    email: data.email,
    password: data.password,
  };

  return formData;
}

export async function login(formData: ILogin) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append(
    'Authorization',
    'Basic QW1EcVV5R2lsWGdDZmhHTVdLbjVMTmNfOjRzeEdXUWRmMG9aemhzbjFmYk95RTV3RHEtYmJmNUhm'
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'password');
  urlencoded.append('username', formData.email);
  urlencoded.append('password', formData.password);
  urlencoded.append(
    'scope',
    'view_published_products:e-commerce-asinc manage_my_orders:e-commerce-asinc manage_my_profile:e-commerce-asinc'
  );

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  const answer = await fetch(
    'https://auth.us-central1.gcp.commercetools.com/oauth/e-commerce-asinc/customers/token',
    requestOptions
  ).then((response) => response.json());

  return answer;
}

export async function loginCustomer(formData: ILogin) {
  const answer = login(formData);

  return answer;
}
