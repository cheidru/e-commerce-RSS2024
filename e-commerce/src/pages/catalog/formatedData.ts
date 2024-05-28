import { IProductResponse } from '../../services/api/InterfaceProduct';
import { ProductCardProps } from '../../components/productCard/productCard';

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

function formatedDataForCard(array: IProductResponse) {
  const allproductsGet: ProductCardProps[] = [];
  array.results.forEach((product) => {
    const title: string = product.masterData.current.name.en;
    const { fractionDigits } =
      product.masterData.staged.masterVariant.prices[0].value;
    let priceOld: number =
      product.masterData.staged.masterVariant.prices[0].value.centAmount;
    priceOld /= converterDigit(fractionDigits);
    let newPrice: number = priceOld;
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
    const propsCard: ProductCardProps = {
      imageUrl,
      onSale,
      title,
      newPrice,
      id,
    };
    allproductsGet.push(propsCard);
  });
  return allproductsGet;
}

export default formatedDataForCard;
