import './catalog.scss';
import {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  MouseEventHandler,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCategories,
  getProductsSorted,
  SortField,
  searchProducts,
} from '../../services/api/getProducts';
import { IProductResponseCategory } from '../../types/Product/InterfaceProduct';
import { ICategoriesResponse } from '../../types/Product/InterfaceCategories';
import {
  formattedDataForCategory,
  formattedDataForCardInCategory,
} from './formattedData';
import {
  ProductCard,
  ProductCardProps,
} from '../../components/productCard/productCard';
import {
  CategoryProps,
  Category,
} from '../../components/asideCatalogCategory/asideCatalogCategory';
import FilterCatalog from '../../components/forms/filterCatalog/filterCatalog';
import Spinner from '../../components/spinner/Spinner';
import Pagination from '../../components/pagination/pagination';

function Catalog() {
  const limit = 8;
  const categoriesAll: CategoryProps[] = [];
  const navigate = useNavigate();

  const [productCardProps, setProductCardProps] = useState<ProductCardProps[]>(
    []
  );
  const [categoryProps, setCategoryProps] = useState(categoriesAll);
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [countPages, setCountPages] = useState(0);

  // Handle category sorted
  const handleSortChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortFieldKey = event.target.value as SortField;
    const sortedProducts = await getProductsSorted(
      categoryId,
      offset,
      sortFieldKey
    );
    const sortedProductsProps = formattedDataForCardInCategory(sortedProducts);
    setProductCardProps(sortedProductsProps);
  };
  // Pagination
  const getCountPagination = (count: number) => {
    const getCountPages = Math.ceil(count / limit);
    const countPagination = getCountPages > 1 ? getCountPages : 0;
    setCountPages(countPagination);
    return countPagination;
  };
  // Handle Search Panel
  const handleChangeInputSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Message 'Not found'
  const showMessageErrorSearch = useCallback(() => {
    setMessageError(true);
    setTimeout(async () => {
      setMessageError(false);
      setCategoryId(categoryId);
      const productsAllGet: IProductResponseCategory = await getProductsSorted(
        categoryId,
        offset
      );
      const productsProps = formattedDataForCardInCategory(productsAllGet);
      setProductCardProps(productsProps);
    }, 3000);
  }, [categoryId, setMessageError, setCategoryId, setProductCardProps, offset]);

  const handleSearchPanel: MouseEventHandler = async () => {
    if (searchQuery.length > 1) {
      const searchResponse = await searchProducts(searchQuery);
      if (!searchResponse.total) {
        getCountPagination(searchResponse.total.total);
        showMessageErrorSearch();
      }
      const searchResponseProductProps =
        formattedDataForCardInCategory(searchResponse);
      setProductCardProps(searchResponseProductProps);
      getCountPagination(searchResponse.total.total);
      setTimeout(() => {
        setSearchQuery('');
      }, 5000);
    }
  };

  // Get products in filter
  const getProductsFilter = useCallback(
    (data: IProductResponseCategory) => {
      if (!data.results[0]) {
        showMessageErrorSearch();
        getCountPagination(data.total);
      }
      const productsProps = formattedDataForCardInCategory(data);
      setProductCardProps(productsProps);
      getCountPagination(data.total);
    },
    [showMessageErrorSearch]
  ); // sort. filter

  useEffect(() => {
    const products = async () => {
      try {
        const productsAllGet: IProductResponseCategory =
          await getProductsSorted(categoryId, offset);
        getCountPagination(productsAllGet.total);

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
  }, [categoryId, offset]);

  if (loading) {
    return <Spinner />;
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
              // eslint-disable-next-line no-sequences
              onClick={() => (setCategoryId(category.id), setOffset(0))}
              isCurrent={category.id === categoryId}
            />
          ))}
          <FilterCatalog getProductsFilter={getProductsFilter} />
        </aside>
        <div className="catalog-products">
          <div className="catalog-sort">
            <label htmlFor="site-search" className="search-label">
              <input
                type="search"
                id="site-search"
                name="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleChangeInputSearch}
                className="search-input"
              />
              <button
                className="search-btn"
                type="button"
                onClick={handleSearchPanel}
              >
                Search
              </button>
            </label>
            <select
              id="sorted-products"
              onChange={handleSortChange}
              className="select-input"
            >
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
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))}
          </div>
          <div className="pagination">
            {Array.from({ length: countPages }).map((_, i) => (
              <Pagination
                isCurrent={offset / limit === i}
                key={`pagination-btn-${i + 1}`}
                id={i}
                onClick={() => setOffset(i * limit)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catalog;
