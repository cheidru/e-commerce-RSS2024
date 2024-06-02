import {
  IProductResponseCategory,
  Image,
  IProductPage,
} from '../../services/api/InterfaceProduct';
import { ProductCardProps } from '../../components/productCard/productCard';
import { ICategoriesResponse } from '../../services/api/InterfaceCategories';
import { CategoryProps } from '../../components/asideCatalogCategory/asideCatalogCategory';

const converterDigit = (digit: number): number => {
  switch (digit) {
    case 1:
      return 10;
    case 2:
      return 100;
    default:
      return 1;
  }
};

export function formattedDataForCategory(
  array: ICategoriesResponse
): CategoryProps[] {
  const categories: CategoryProps[] = [];
  const categoryDefault: CategoryProps = {
    name: 'All',
    id: 'exists',
    isCurrent: true,
  };
  categories.push(categoryDefault);
  array.results.forEach((category) => {
    const name: string = category.name.en;
    const { id } = category;
    const propsCategory: CategoryProps = {
      name,
      id,
      isCurrent: false,
    };
    categories.push(propsCategory);
    categories.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  });
  return categories;
}

export function formattedDataForCardInCategory(
  array: IProductResponseCategory
) {
  const productsAllGet: ProductCardProps[] = [];
  array.results.forEach((product) => {
    const title: string = product.name.en;
    const description: string = product.description.en;
    const imageUrl: string[] = [product.masterVariant.images[0].url];
    let onSale: boolean = false;
    const { fractionDigits } = product.masterVariant.prices[0].value;
    let oldPrice: number = product.masterVariant.prices[0].value.centAmount;
    oldPrice /= converterDigit(fractionDigits);
    let newPrice: number = oldPrice;
    if (product.masterVariant.prices[0].discounted) {
      newPrice = product.masterVariant.prices[0].discounted.value.centAmount;
      newPrice /= converterDigit(fractionDigits);
      onSale = true;
    }
    const { id } = product;
    const currencyName = product.masterVariant.prices[0].value.currencyCode;
    const currency = currencyName === 'USD' ? '$' : '€';

    const propsCard: ProductCardProps = {
      imageUrl,
      onSale,
      title,
      description,
      newPrice,
      oldPrice,
      currency,
      id,
    };
    productsAllGet.push(propsCard);
  });
  return productsAllGet;
}

export function formattedDataForOneProduct(data: IProductPage) {
  const imageUrl: string[] = [];
  data.masterData.staged.masterVariant.images.forEach((url: Image) => {
    imageUrl.push(url.url);
  });
  const { fractionDigits } =
    data.masterData.staged.masterVariant.prices[0].value;
  const oldPrice =
    data.masterData.staged.masterVariant.prices[0].value.centAmount /
    converterDigit(fractionDigits);
  const onSale = !!data.masterData.staged.masterVariant.prices[0].discounted;
  let newPrice = oldPrice;
  if (
    onSale &&
    data.masterData.staged.masterVariant.prices[0].discounted?.value.centAmount
  ) {
    newPrice =
      data.masterData.staged.masterVariant.prices[0].discounted.value
        .centAmount / converterDigit(fractionDigits);
  }
  const currencyName =
    data.masterData.staged.masterVariant.prices[0].value.currencyCode;
  const currency = currencyName === 'USD' ? '$' : '€';
  const { id } = data;

  const propsProductProps: ProductCardProps = {
    imageUrl,
    onSale,
    title: data.masterData.current.name.en,
    description: data.masterData.current.description.en,
    newPrice,
    oldPrice,
    currency,
    id,
  };
  // console.log(propsProductProps);
  return propsProductProps;
}
