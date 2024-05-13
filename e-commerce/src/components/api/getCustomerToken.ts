const clientID = 'MXjx0D7Jw1Cmi0ZqSHWq2MUJ';
const secret = 'HQk1sjqtKnouVW4uQ9ofT_6PGhL66lXT';
const scope = 'manage_project:e-commerce-asinc';
const region = 'auth.us-central1.gcp.commercetools.com';
export const apiURL = 'https://api.us-central1.gcp.commercetools.com';
export const authURL = 'https://auth.us-central1.gcp.commercetools.com';

// Password flow for global Customers
// https://docs.commercetools.com/api/authorization#password-flow
// POST https://{auth_host}/oauth/{projectKey}/customers/token
// Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
// Content-Type: application/x-www-form-urlencoded
// grant_type=password&username={email}&password={password}&scope={scope}

// https://docs.commercetools.com/getting-started/make-first-api-call#get-your-access-token
// "scope": "manage_project:e-commerce-asinc"
// "https://MXjx0D7Jw1Cmi0ZqSHWq2MUJ:HQk1sjqtKnouVW4uQ9ofT_6PGhL66lXT@auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials&scope=manage_project:e-commerce-asinc"

async function createAccessToken() {
  const answer = await fetch(
    `https://${clientID}:${secret}@${region}/oauth/token?grant_type=client_credentials&scope=${scope}`,
    { method: 'POST' }
  );
  return answer;
}

export function getBearerToken() {
  const token = createAccessToken()
    .then((result) => result.json())
    .then((result) => result.access_token);
  return token;
}

// https://docs.commercetools.com/api/projects/me-profile#create-sign-up-customer

export async function registerNewCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  bearerToken: string
) {
  const customerObj = {
    email,
    firstName,
    lastName,
    password,
  };
  const answer = await fetch(
    'https://api.us-central1.gcp.commercetools.com/e-commerce-asinc/me/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(customerObj),
    }
  );
  return answer;
}
