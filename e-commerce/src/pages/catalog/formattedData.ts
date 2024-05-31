import {
  IProductResponse,
  IProductResponseCategory,
} from '../../services/api/InterfaceProduct';
import { ProductCardProps } from '../../components/productCard/productCard';
import { ICategoriesResponse } from '../../services/api/InterfaceCategories';
import {
  CategoryProps,
  OnClickType,
} from '../../components/asideCatalogCategory/asideCatalogCategory';

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

export function formattedDataForCard(array: IProductResponse) {
  const productsAllGet: ProductCardProps[] = [];
  array.results.forEach((product) => {
    const title: string = product.masterData.current.name.en;
    const description: string = product.masterData.current.description.en;
    const { fractionDigits } =
      product.masterData.staged.masterVariant.prices[0].value;
    let oldPrice: number =
      product.masterData.staged.masterVariant.prices[0].value.centAmount;
    oldPrice /= converterDigit(fractionDigits);
    let newPrice: number = oldPrice;
    let onSale = false;
    if (product.masterData.staged.masterVariant.prices[0].discounted) {
      newPrice =
        product.masterData.staged.masterVariant.prices[0].discounted.value
          .centAmount;
      newPrice /= converterDigit(fractionDigits);
      onSale = true;
    }
    const imageUrl: string =
      product.masterData.staged.masterVariant.images[0].url;
    const { id } = product;
    const currencyName =
      product.masterData.staged.masterVariant.prices[0].value.currencyCode;
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

export function formattedDataForCategory(
  array: ICategoriesResponse,
  onClick: OnClickType['onClick']
): CategoryProps[] {
  const categories: CategoryProps[] = [];
  const categoryDefault: CategoryProps = {
    name: 'All',
    id: '0',
    onClick,
    isCurrent: true,
  };
  categories.push(categoryDefault);
  array.results.forEach((category) => {
    const name: string = category.name.en;
    const { id } = category;
    const propsCategory: CategoryProps = {
      name,
      id,
      onClick,
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
    const imageUrl: string = product.masterVariant.images[0].url;
    let onSale: boolean = false;
    const { fractionDigits } = product.masterVariant.prices[0].value;
    let oldPrice: number = product.masterVariant.prices[0].value.centAmount;
    oldPrice = converterDigit(fractionDigits);
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
