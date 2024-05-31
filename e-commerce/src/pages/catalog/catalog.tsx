import './catalog.scss';
import { useEffect, useState } from 'react';
import {
  getProductsAll,
  getCategories,
  getProductsSorted,
} from '../../services/api/getProducts';
import {
  IProductResponse,
  IProductResponseCategory,
} from '../../services/api/InterfaceProduct';
import { ICategoriesResponse } from '../../services/api/InterfaceCategories';
import {
  formattedDataForCard,
  formattedDataForCategory,
  formattedDataForCardInCategory,
} from './formattedData';
import {
  ProductCard,
  ProductCardProps,
} from '../../components/productCard/productCard';
import {
  OnClickType,
  CategoryProps,
  Category,
} from '../../components/asideCatalogCategory/asideCatalogCategory';
import spinner from '../../assets/img/gif/spinner.gif';

function Catalog() {
  const productsAll: ProductCardProps[] = [];
  const categoriesAll: CategoryProps[] = [];
  const categoryIdDefault: string = '0';

  const [productCardProps, setProductCardProps] = useState(productsAll);
  const [categoryProps, setCategoryProps] = useState(categoriesAll);
  const [categoryId, setCategoryId] = useState(categoryIdDefault);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // render products for category
  const productsCategory = async (categoryIdClick: string) => {
    if (categoryIdClick === categoryIdDefault) {
      const productsAllGet: IProductResponse = await getProductsAll();
      const productsPropsAll = formattedDataForCard(productsAllGet);
      setProductCardProps(productsPropsAll);
    } else {
      const products: IProductResponseCategory =
        await getProductsSorted(categoryIdClick);
      const productsProps = formattedDataForCardInCategory(products);
      setProductCardProps(productsProps);
    }
  };

  // Handle Clicked category
  const handlerCategoryChoose: OnClickType['onClick'] = async (event) => {
    const categoryChoiceIdClick = event.currentTarget.getAttribute('data-id');
    if (categoryChoiceIdClick) {
      setCategoryId(categoryChoiceIdClick);
      await productsCategory(categoryChoiceIdClick);
    }
  };

  useEffect(() => {
    const products = async () => {
      try {
        const productsAllGet: IProductResponse = await getProductsAll();
        const productsProps = formattedDataForCard(productsAllGet);
        setProductCardProps(productsProps);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    const categories = async () => {
      const categoriesAllGet: ICategoriesResponse = await getCategories();
      const categoriesAllData = formattedDataForCategory(
        categoriesAllGet,
        handlerCategoryChoose
      );
      setCategoryProps(categoriesAllData);
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
    <section className="catalog">
      <h2 className="catalog-title">Catalog</h2>
      <div className="catalog-wrapper">
        <aside className="categories">
          {categoryProps.map((category) => (
            <Category
              key={category.id}
              name={category.name}
              id={category.id}
              onClick={handlerCategoryChoose}
              isCurrent={category.id === categoryId}
            />
          ))}
        </aside>
        <div className="catalog-products">
          {productCardProps.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Catalog;
