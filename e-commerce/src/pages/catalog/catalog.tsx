import './catalog.scss';
import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCategories,
  getProductsSorted,
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
  const [sortKey, setSortKey] = useState('createdAt asc');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [countPages, setCountPages] = useState(0);

  // Handle category sortedSelect
  const handleSortChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const sortFieldKey = event.target.value;
    setSortKey(sortFieldKey);
    setOffset(0);
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
  const handleClearSearch = () => {
    setSearchQuery('');
    setMessageError(false);
  };
  // Message 'Not found' search/filter
  const showMessageErrorSearch = useCallback(() => {
    setMessageError(true);
    setOffset(0);
  }, [setMessageError]);

  // Get products in filter
  const getProductsFilter = useCallback(
    (data: IProductResponseCategory) => {
      if (!data.results[0]) {
        getCountPagination(data.total);
        setOffset(0);
        showMessageErrorSearch();
      }
      setMessageError(false);
      const productsProps = formattedDataForCardInCategory(data);
      setProductCardProps(productsProps);
      getCountPagination(data.total);
    },
    [showMessageErrorSearch]
  );

  useEffect(() => {
    const products = async () => {
      try {
        const productsAllGet: IProductResponseCategory =
          await getProductsSorted(categoryId, offset, sortKey);
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
    if (!searchQuery) {
      products();
    }
    categories();
  }, [categoryId, offset, sortKey, searchQuery]);

  useEffect(() => {
    const searchProductsQuery = async () => {
      if (searchQuery.length > 1) {
        const searchResponse = await searchProducts(
          searchQuery,
          offset,
          sortKey
        );

        if (!searchResponse.total) {
          showMessageErrorSearch();
          getCountPagination(0);
        } else {
          setMessageError(false);
          const searchResponseProductProps =
            formattedDataForCardInCategory(searchResponse);
          setProductCardProps(searchResponseProductProps);
          getCountPagination(searchResponse.total);
        }
      }
    };
    searchProductsQuery();
  }, [searchQuery, showMessageErrorSearch, offset, sortKey]);

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
          <FilterCatalog
            getProductsFilter={getProductsFilter}
            offset={offset}
            sort={sortKey}
          />
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
                onClick={() => setSearchQuery(searchQuery)}
                disabled={!searchQuery}
              >
                Search
              </button>
              <button
                className="clear-btn"
                type="button"
                onClick={handleClearSearch}
                disabled={!searchQuery}
              >
                x
              </button>
            </label>
            <select
              id="sorted-products"
              onChange={handleSortChange}
              className="select-input"
            >
              <option value="createdAt asc">Sort by</option>
              <option value="price asc">Lowest price</option>
              <option value="price desc">Highest price</option>
              <option value="createdAt desc">What&apos;s New</option>
              <option value="name.en asc">Name (A To Z)</option>
              <option value="name.en desc">Name (Z To A)</option>
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
