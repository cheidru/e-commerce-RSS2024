import './catalog.scss';
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCategories,
  getProductsSorted,
  SortField,
  searchProducts,
} from '../../services/api/getProducts';
import { IProductResponseCategory } from '../../services/api/InterfaceProduct';
import { ICategoriesResponse } from '../../services/api/InterfaceCategories';
import {
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
import FilterCatalog from '../../components/forms/filterCatalog/filterCatalog';
import spinner from '../../assets/img/gif/spinner.gif';

let messageError = false;

function Catalog() {
  const productsAll: ProductCardProps[] = [];
  const categoriesAll: CategoryProps[] = [];
  const categoryIdDefault: string = 'exists';
  const navigate = useNavigate();
  const searchQueryDefault: string = '';

  const [productCardProps, setProductCardProps] = useState(productsAll);
  const [categoryProps, setCategoryProps] = useState(categoriesAll);
  const [categoryId, setCategoryId] = useState(categoryIdDefault);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState(searchQueryDefault);

  // render products for category
  const productsCategory = async (categoryIdClick: string) => {
    const products: IProductResponseCategory =
      await getProductsSorted(categoryIdClick);
    const productsProps = formattedDataForCardInCategory(products);
    setProductCardProps(productsProps);
  };

  // Handle Clicked category
  const handlerCategoryChoose: OnClickType['onClick'] = async (event) => {
    const categoryChoiceIdClick = event.currentTarget.getAttribute('data-id');
    if (categoryChoiceIdClick) {
      setCategoryId(categoryChoiceIdClick);
      await productsCategory(categoryChoiceIdClick);
    }
  };
  // Handle category sorted
  const handleSortChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortFieldKey = event.target.value as SortField;
    const sortedProducts = await getProductsSorted(categoryId, sortFieldKey);
    const sortedProductsProps = formattedDataForCardInCategory(sortedProducts);
    setProductCardProps(sortedProductsProps);
  };
  // Handle Search Panel
  const handleChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchPanel: OnClickType['onClick'] = async () => {
    if (searchQuery.length > 1) {
      const searchResponse = await searchProducts(searchQuery);
      if (!searchResponse.total) {
        messageError = true;
      } else {
        messageError = false;
      }
      const searchResponseProductProps =
        formattedDataForCardInCategory(searchResponse);
      setProductCardProps(searchResponseProductProps);
      setSearchQuery('');
    }
  };
  // Open product page
  const openProduct = async (id: string) => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };
  // Handle Clicked product
  const handlerProductChoose: (
    event: React.MouseEvent<HTMLDivElement>
  ) => void = async (event) => {
    const productChoiceClick = event.currentTarget.getAttribute('data-id');
    if (productChoiceClick) {
      await openProduct(productChoiceClick);
    }
  };

  // get products in filter
  function getProductsFilter(data: IProductResponseCategory) {
    if (!data.results[0]) {
      messageError = true;
    } else {
      messageError = false;
    }
    const productsProps = formattedDataForCardInCategory(data);
    setProductCardProps(productsProps);
  }

  useEffect(() => {
    const products = async () => {
      try {
        const productsAllGet: IProductResponseCategory =
          await getProductsSorted(categoryIdDefault);
        const productsProps = formattedDataForCardInCategory(productsAllGet);
        setProductCardProps(productsProps);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    const categories = async () => {
      const categoriesAllGet: ICategoriesResponse = await getCategories();
      const categoriesAllData = formattedDataForCategory(categoriesAllGet);
      setCategoryProps(categoriesAllData);
    };
    products();
    categories();
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
          <FilterCatalog getProductsFilter={() => getProductsFilter()} />
        </aside>
        <div className="catalog-products">
          <div className="catalog-sort">
            <label htmlFor="site-search">
              Search the site:
              <input
                type="search"
                id="site-search"
                name="search"
                value={searchQuery}
                onChange={handleChangeInputSearch}
              />
              <button type="button" onClick={handleSearchPanel}>
                Search
              </button>
            </label>
            <select id="sorted-products" onChange={handleSortChange}>
              <option value={SortField.Default}>Sort by</option>
              <option value={SortField.PriceAsc}>Lowest price</option>
              <option value={SortField.PriceDesc}>Highest price</option>
              <option value={SortField.CreatedAt}>What&apos;s New</option>
              <option value={SortField.NameAsc}>Name (A To Z)</option>
              <option value={SortField.NameDesc}>Name (Z To A)</option>
            </select>
          </div>
          <div className="catalog-product" id="catalog-product">
            {messageError
              ? 'Product not found'
              : productCardProps.map((product) => (
                  <ProductCard
                    {...product}
                    key={product.id}
                    onClick={handlerProductChoose}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
