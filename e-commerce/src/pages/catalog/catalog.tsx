import './catalog.scss';
import { useEffect, useState } from 'react';
import { getProductsAll } from '../../services/api/getProducts';
import { IProductResponse } from '../../services/api/InterfaceProduct';
import {
  ProductCard,
  ProductCardProps,
} from '../../components/productCard/productCard';

function Catalog() {
  const allproducts1: ProductCardProps[] = [];
  const [prodactCardProps, setProdactCardProps] = useState(allproducts1);
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

  useEffect(() => {
    const products = async () => {
      const allproducts: ProductCardProps[] = [];
      const getAllproducts: IProductResponse = await getProductsAll();
      getAllproducts.results.forEach((product) => {
        // console.log(product)
        const title: string = product.masterData.current.name.en;
        // const descriptionProduct: string =  product.masterData.current.description.en;
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
        // const currency: string = product.masterData.staged.masterVariant.prices[0].value.currencyCode;
        const imageUrl: string =
          product.masterData.staged.masterVariant.images[0].url;
        const { id } = product;
        // console.log(title, descriptionProduct, priceOld, newPrice, currency, imageUrl);
        const propsCard: ProductCardProps = {
          imageUrl,
          onSale,
          title,
          newPrice,
          id,
        };
        allproducts.push(propsCard);
      });
      setProdactCardProps(allproducts);
      // console.log(allproducts);
    };

    // const productInfo = async (id:string) => {
    //   const oneProduct: IProductResponse = await getProduct(id);
    //   //console.log('oneProduct', oneProduct)
    // }
    // const productForSale = '52df2b34-33ea-491f-a95d-e9d7224d9a7c';
    // const productNotSale = '4c3156fc-706e-4675-a80a-2d1249e1b72d';
    products();
    // productInfo(productForSale);
    // productInfo(productNotSale);
  }, []);

  return (
    <>
      <h2 className="catalog free-page">Catalog</h2>
      <div className="wrapper-card">
        {prodactCardProps.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default Catalog;
