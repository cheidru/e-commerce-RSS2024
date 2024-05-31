import { getAccessToken } from './getCustomerToken';
import { IProductResponse, IProductResponseCategory } from './InterfaceProduct';
import { ICategoriesResponse } from './InterfaceCategories';

// Header for all request
async function requestOptions(): Promise<RequestInit> {
  const myHeaders = new Headers();
  const appToken = await getAccessToken().then((result) => result.access_token);
  myHeaders.append('Authorization', `Bearer ${appToken}`);

  const options: RequestInit = {
    method: 'GET',
    headers: myHeaders,
  };
  return options;
}

export async function getProductsAll(): Promise<IProductResponse> {
  const options = await requestOptions();

  // Checking arrow error
  const answer: Response = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/products`,
    options
  );
  if (!answer.ok) {
    let errorMessage = '';
    if (answer.status === 429) {
      errorMessage = 'Too Many Requests API rate limit. Come back later!';
    } else if (answer.status >= 500) {
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
  const options = await requestOptions();

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/products/${id}`,
    options
  );

  const result = await answer.json();

  return result;
}

export async function getCategories(): Promise<ICategoriesResponse> {
  const options = await requestOptions();

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/categories`,
    options
  );

  const result = await answer.json();

  return result;
}

export async function getProductsSorted(
  categoryId: string
): Promise<IProductResponseCategory> {
  const options = await requestOptions();

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/search?filter=categories.id:"${categoryId}"`,
    options
  );

  const categoryProducts = await answer.json();
  return categoryProducts;
}

// async function getProduct(id: string) {
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
