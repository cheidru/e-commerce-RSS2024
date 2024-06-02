import { getAccessToken } from './getCustomerToken';
import { IProductResponseCategory } from './InterfaceProduct';
import { ICategoriesResponse } from './InterfaceCategories';

const urlProject = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}`;
export enum SortField {
  PriceAsc = 'priceAsc',
  PriceDesc = 'priceDesc',
  CreatedAt = 'createdAtDesc',
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  Default = 'createdAtAsc',
}

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

export async function getProduct(id: string) {
  const options = await requestOptions();
  const url = `${urlProject}/products/${id}`;

  const answer = await fetch(url, options);
  const result = await answer.json();

  return result;
}

export async function getCategories(): Promise<ICategoriesResponse> {
  const options = await requestOptions();
  const url = `${urlProject}/categories`;

  const answer = await fetch(url, options);
  const result = await answer.json();

  return result;
}

export async function getProductsSorted(
  categoryId: string,
  sortFieldKey: SortField = SortField.Default
): Promise<IProductResponseCategory> {
  const options = await requestOptions();

  const sortFieldOptional: Record<SortField, string> = {
    [SortField.PriceAsc]: 'price asc',
    [SortField.PriceDesc]: 'price desc',
    [SortField.CreatedAt]: 'createdAt desc',
    [SortField.NameAsc]: 'name.en asc',
    [SortField.NameDesc]: 'name.en desc',
    [SortField.Default]: 'createdAt asc',
  };
  const sortFieldGet = sortFieldOptional[sortFieldKey];

  const url = new URL(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/product-projections/search?`
  );
  const filterCategory =
    categoryId === 'exists'
      ? `categories:exists`
      : `categories.id:"${categoryId}"`;
  url.searchParams.append('filter', filterCategory);
  url.searchParams.append('sort', sortFieldGet);
  url.searchParams.append('priceCurrency', 'USD');

  const answer = await fetch(url.toString(), options);

  const categoryProducts = await answer.json();
  return categoryProducts;
}

export async function searchProducts(value: string) {
  const options = await requestOptions();
  const language = 'en';
  const fuzzy = true;
  const url = `${urlProject}/product-projections/search?text.${language}=${value}&fuzzy=${fuzzy}`;

  const answer = await fetch(url, options);
  const result = await answer.json();

  return result;
}
