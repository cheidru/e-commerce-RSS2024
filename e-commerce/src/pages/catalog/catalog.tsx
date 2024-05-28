import './catalog.scss';
import { useEffect, useState } from 'react';
import { getProductsAll, getCategories } from '../../services/api/getProducts';
import { IProductResponse } from '../../services/api/InterfaceProduct';
import { ICategoryesResponse } from '../../services/api/InterfaceCategories';
import { formatedDataForCard, formatedDataForCategory } from './formatedData';
import {
  ProductCard,
  ProductCardProps,
} from '../../components/productCard/productCard';
import {
  CategoryProps,
  Category,
} from '../../components/asideCatalogCategory/asideCatalogCategory';
import spinner from '../../assets/img/gif/spinner.gif';

function Catalog() {
  const allproducts: ProductCardProps[] = [];
  const allcategories: CategoryProps[] = [];

  const [prodactCardProps, setProdactCardProps] = useState(allproducts);
  const [categoryProps, setcategoryProps] = useState(allcategories);
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
    const categories = async () => {
      const categoriesAllGet: ICategoryesResponse = await getCategories();
      const categoriesAll = formatedDataForCategory(categoriesAllGet);
      setcategoryProps(categoriesAll);
    };

    // const productInfo = async (id:string) => {
    //   const oneProduct: IProductResponse = await getProduct(id);
    //   //console.log('oneProduct', oneProduct)
    // }
    // const productForSale = '52df2b34-33ea-491f-a95d-e9d7224d9a7c';
    // const productNotSale = '4c3156fc-706e-4675-a80a-2d1249e1b72d';
    products();
    categories();
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
      <div className="catalog-wrapper">
        <aside className="categories">
          {categoryProps.map((category) => (
            <Category {...category} key={category.id} />
          ))}
          <div className="category" />
        </aside>
        {prodactCardProps.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default Catalog;
