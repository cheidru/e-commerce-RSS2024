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
  return answer;
}

async function register(customer: object, token: string) {
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

export async function registerNewCustomer(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  const customerObj = {
    email,
    firstName,
    lastName,
    password,
  };

  const answer = createAccessToken()
    .then((result) => result.json())
    .then((result) => register(customerObj, result.access_token));

  return answer;
}
