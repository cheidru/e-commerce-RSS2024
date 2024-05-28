import './catalog.scss';
import { useEffect, useState } from 'react';
import { getProductsAll } from '../../services/api/getProducts';
import { IProductResponse } from '../../services/api/InterfaceProduct';
import formatedDataForCard from './formatedData';
import {
  ProductCard,
  ProductCardProps,
} from '../../components/productCard/productCard';
import spinner from '../../assets/img/gif/spinner.gif';

function Catalog() {
  const allproducts: ProductCardProps[] = [];
  const [prodactCardProps, setProdactCardProps] = useState(allproducts);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const products = async () => {
      try {
        const getAllproducts: IProductResponse = await getProductsAll();
        const allproductsGet = formatedDataForCard(getAllproducts);
        setProdactCardProps(allproductsGet);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return <img src={spinner} alt="loading..." />;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
