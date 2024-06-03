import './catalog.scss';
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCategories,
  getProductsSorted,
  SortField,
  searchProducts,
  filterProductsInfo,
} from '../../services/api/getProducts';
import {
  IFilter,
  IProductResponseCategory,
} from '../../services/api/InterfaceProduct';
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
import spinner from '../../assets/img/gif/spinner.gif';

function Catalog() {
  const productsAll: ProductCardProps[] = [];
  const categoriesAll: CategoryProps[] = [];
  const categoryIdDefault: string = 'exists';
  const navigate = useNavigate();
  const searchQueryDefault: string = '';
  const filterPanelPropsDefault: IFilter = {
    priceMax: 0,
    priceMin: 0,
    color: [],
    model: [],
  };

  const [productCardProps, setProductCardProps] = useState(productsAll);
  const [categoryProps, setCategoryProps] = useState(categoriesAll);
  const [categoryId, setCategoryId] = useState(categoryIdDefault);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState(searchQueryDefault);
  const [filterPanelProps, setFilterPanel] = useState(filterPanelPropsDefault);

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
    const filterInfo = async () => {
      const filterInfoResponse = await filterProductsInfo();
      setFilterPanel(filterInfoResponse);
    };

    products();
    categories();
    filterInfo();
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
          <details>
            <summary>Filter</summary>
            <form className="form-filter">
              <fieldset>
                <legend>Price</legend>
                <label htmlFor="priceMin">
                  Min price
                  <input
                    className="input-text"
                    type="number"
                    id="priceMin"
                    placeholder={`${filterPanelProps.priceMin}`}
                    min={filterPanelProps.priceMin}
                    max={filterPanelProps.priceMax}
                  />
                </label>
                <label htmlFor="priceMax">
                  {' '}
                  Max price
                  <input
                    className="input-text"
                    type="number"
                    id="priceMax"
                    placeholder={`${filterPanelProps.priceMax}`}
                    min={filterPanelProps.priceMin}
                    max={filterPanelProps.priceMax}
                  />
                </label>
              </fieldset>
              <fieldset>
                <legend>Color</legend>
                {filterPanelProps.color.map((color) => (
                  <label htmlFor={color} key={color}>
                    <input
                      className="input-checkbox"
                      type="checkbox"
                      id={color}
                      name="filter-color"
                      value={color}
                    />
                    {color}
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>Model</legend>

                {filterPanelProps.model.map((model) => (
                  <label htmlFor={model} key={model}>
                    <input
                      className="input-checkbox"
                      type="checkbox"
                      id={model}
                      name="filter-model"
                      value={model}
                    />
                    {model}
                  </label>
                ))}
              </fieldset>
              <button type="submit" className="category-btn filter-btn">
                Send
              </button>
            </form>
          </details>
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
          <div className="catalog-product">
            {productCardProps.map((product) => (
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
