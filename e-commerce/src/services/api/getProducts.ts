import { getAccessToken } from './getCustomerToken';
import {
  IFilter,
  IProductResponseCategory,
  IProductResponse,
} from '../../types/Product/InterfaceProduct';
import { ICategoriesResponse } from '../../types/Product/InterfaceCategories';
import {
  converterDigit,
  formattedDataForFilter,
} from '../../pages/catalog/formattedData';

const urlProject = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}`;
const urlProductSearch = `${urlProject}/product-projections/search?`;
const limitProduct = '8';

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
  offset: number,
  sortFieldKey: string = 'createdAt asc'
): Promise<IProductResponseCategory> {
  const options = await requestOptions();

  const sortFieldGet = sortFieldKey;

  const url = new URL(urlProductSearch);
  const filterCategory = categoryId
    ? `categories.id:"${categoryId}"`
    : `categories:exists`;
  url.searchParams.append('filter', filterCategory);
  url.searchParams.append('sort', sortFieldGet);
  url.searchParams.append('priceCurrency', 'USD');
  url.searchParams.append('limit', limitProduct);
  url.searchParams.append('offset', `${offset}`);

  const answer = await fetch(url.toString(), options);

  const categoryProducts = await answer.json();
  return categoryProducts;
}

export async function searchProducts(value: string) {
  const options = await requestOptions();
  const language = 'en';
  const fuzzy = true;
  const url = new URL(urlProductSearch);
  url.searchParams.append(`text.${language}`, `"${value}"`);
  url.searchParams.append('fuzzy', `${fuzzy}`);
  url.searchParams.append('limit', limitProduct);
  url.searchParams.append('offset', '0');

  const answer = await fetch(url, options);
  const result = await answer.json();

  return result;
}

export async function filterProductsInfo() {
  const options = await requestOptions();
  const url = `${urlProject}/products?limit=100`;

  const requestData = await fetch(url, options);
  const responseData: IProductResponse = await requestData.json();

  const filterProps: IFilter = formattedDataForFilter(responseData.results);
  return filterProps;
}

export async function filterProducts(data: IFilter) {
  const options = await requestOptions();
  const url = new URL(urlProductSearch);
  if (data.color.length > 0) {
    const param = data.color.map((elem) => `"${elem}"`).join(', ');
    url.searchParams.append('filter', `variants.attributes.color: ${param}`);
  }
  if (data.model.length > 0) {
    const param = data.model.map((elem) => `"${elem}"`).join(', ');
    url.searchParams.append('filter', `variants.attributes.model:${param}`);
  }

  if (data.priceMax && data.priceMin) {
    const minPrice = data.priceMin * converterDigit(data.fractionDigits);
    const maxPrice = data.priceMax * converterDigit(data.fractionDigits);
    const filterPrice = `variants.price.centAmount:range (${minPrice} to ${maxPrice})`;
    url.searchParams.append('filter', filterPrice);
  }

  const answer = await fetch(url, options);
  const result: IProductResponseCategory = await answer.json();

  return result;
}
