import { getAccessToken } from './getCustomerToken';
import { IProductResponse } from './InterfaceProduct';

export async function getProductsAll(): Promise<IProductResponse> {
  const myHeaders = new Headers();
  const appToken = await getAccessToken().then((result) => result.access_token);
  myHeaders.append('Authorization', `Bearer ${appToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  // Checking arrow error
  const answer: Response = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/products`,
    requestOptions
  );
  if (!answer.ok) {
    let errorMessage = '';
    if (answer.status === 429) {
      // RSS-ECOMM-3_01
      errorMessage = 'Too Many Requests API rate limit. Come back later!';
    } else if (answer.status >= 500) {
      // RSS-ECOMM-3_01
      errorMessage = 'Server error';
    } else {
      errorMessage = `Error: ${answer.status}`;
    }
    throw new Error(errorMessage);
  }

  const result = await answer.json();
  return result;
}

export async function getProduct(id: string) {
  const myHeaders = new Headers();
  const appToken = await getAccessToken().then((result) => result.access_token);
  myHeaders.append('Authorization', `Bearer ${appToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/products/${id}`,
    requestOptions
  );

  const result = await answer.json();

  return result;
}

// async function getProduct() {
//   const myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer DkNPdCgTpXJt_J9iJluQHvGQ0V6x8yMv');

//   // const urlencoded = new URLSearchParams();

//   const requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     // body: urlencoded,
//   };

//   const answer = await fetch(
//     `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/products?limit=8&offset=2&sort=masterData.current.name.en asc`,
//     requestOptions
//   );

//   const result = await answer.json();

//   return result;
// }

export default getProductsAll;
