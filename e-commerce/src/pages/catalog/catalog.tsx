import './catalog.scss';
// import { useEffect } from 'react';
import WetFloor from '../../components/stubs/wetfloor';
// import getProducts from '../../services/api/getProducts';
// import { IProductResponse } from '../../services/api/InterfaceProduct';

function Catalog() {
  // const dataProduct = [];
  // useEffect(() => {
  // const products = async () => {
  // const getAllproducts: IProductResponse = await getProducts();
  // getAllproducts.results.forEach((product) => {
  // dataProduct.push(product);
  // dataProduct.push(<ProductCard {{imageUrl= product.masterData,
  //   inStock: product.;
  //   onSale: boolean;
  //   hasGift: boolean;
  //   title: string;
  //   newPrice: string;
  //   oldPrice: string;}} />);
  // });
  // };
  // products();
  // }, []);

  return (
    <>
      <h2 className="catalog free-page">Catalog</h2>
      <WetFloor />
    </>
  );
}

export default Catalog;
