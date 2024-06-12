import { useEffect, useState, FormEvent, ChangeEvent, useRef } from 'react';
import {
  IFilter,
  IProductResponseCategory,
} from '../../../types/Product/InterfaceProduct';
import {
  filterProductsInfo,
  filterProducts,
} from '../../../services/api/getProducts';

type Props = {
  getProductsFilter: (data: IProductResponseCategory) => void;
};

function FilterCatalog({ getProductsFilter }: Props): React.ReactElement {
  const filterPanelPropsDefault: IFilter = {
    priceMax: 0,
    priceMin: 0,
    color: [],
    model: [],
    fractionDigits: 0,
  };
  const formRefFilter = useRef<HTMLFormElement>(null);

  const [filterPanelProps, setFilterPanel] = useState(filterPanelPropsDefault);
  const [priceMin, setPriceMin] = useState(filterPanelPropsDefault.priceMin);
  const [priceMax, setPriceMax] = useState(filterPanelPropsDefault.priceMax);
  const [fractionDigits, setFractionDigits] = useState(
    filterPanelPropsDefault.fractionDigits
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  useEffect(() => {
    const filterInfo = async () => {
      const filterInfoResponse = await filterProductsInfo();
      setFilterPanel(filterInfoResponse);
      setPriceMin(filterInfoResponse.priceMin);
      setPriceMax(filterInfoResponse.priceMax);
      setFractionDigits(filterInfoResponse.fractionDigits);
    };

    filterInfo();
  }, []);

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedColors((prevSelectedColors) => [...prevSelectedColors, value]);
    } else {
      setSelectedColors((prevSelectedColors) =>
        prevSelectedColors.filter((color) => color !== value)
      );
    }
  };

  const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedModels((prevSelectedModels) => [...prevSelectedModels, value]);
    } else {
      setSelectedModels((prevSelectedModels) =>
        prevSelectedModels.filter((model) => model !== value)
      );
    }
  };

  const onSubmitFilter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: IFilter = {
      priceMin,
      priceMax,
      color: selectedColors,
      model: selectedModels,
      fractionDigits,
    };
    const result = await filterProducts(formData);

    getProductsFilter(result);
  };
  // clear filter
  const handleClearFilters = async () => {
    setPriceMin(filterPanelPropsDefault.priceMin);
    setPriceMax(filterPanelPropsDefault.priceMax);
    setFractionDigits(filterPanelPropsDefault.fractionDigits);
    setSelectedColors(filterPanelPropsDefault.color);
    setSelectedModels(filterPanelPropsDefault.model);

    if (formRefFilter.current) {
      const form = formRefFilter.current;
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        if (input.type === 'checkbox') {
          const checkbox = input as HTMLInputElement;
          checkbox.checked = false;
        } else {
          const inputText = input as HTMLInputElement;
          inputText.value = '';
        }
      });
    }
  };

  return (
    <details>
      <summary>Filter</summary>
      <form
        ref={formRefFilter}
        className="form-filter"
        onSubmit={onSubmitFilter}
      >
        <fieldset className="filter-price">
          <legend>Price</legend>
          <label htmlFor="priceMin">
            Min price
            <input
              className="input-text"
              type="number"
              id="priceMin"
              placeholder={`${filterPanelProps.priceMin}`}
              onChange={(e) => setPriceMin(Number(e.target.value))}
            />
          </label>
          <label htmlFor="priceMax">
            Max price
            <input
              className="input-text"
              type="number"
              id="priceMax"
              placeholder={`${filterPanelProps.priceMax}`}
              onChange={(e) => setPriceMax(Number(e.target.value))}
            />
          </label>
        </fieldset>
        <fieldset className="filter-fieldset filter-color">
          <legend>Color</legend>
          {filterPanelProps.color.map((color) => (
            <label htmlFor={color} key={color}>
              <input
                className="input-checkbox"
                type="checkbox"
                id={color}
                name="filter-color"
                value={color}
                onChange={handleColorChange}
              />
              {color}
            </label>
          ))}
        </fieldset>
        <fieldset className="filter-fieldset filter-model">
          <legend>Model</legend>

          {filterPanelProps.model.map((model) => (
            <label htmlFor={model} key={model}>
              <input
                className="input-checkbox"
                type="checkbox"
                id={model}
                name="filter-model"
                value={model}
                onChange={handleModelChange}
              />
              {model}
            </label>
          ))}
        </fieldset>
        <div className="filter-box-btn">
          <button
            type="button"
            className="filter-btn"
            onClick={handleClearFilters}
          >
            Clear
          </button>
          <button type="submit" className="filter-btn">
            Send
          </button>
        </div>
      </form>
    </details>
  );
}

export default FilterCatalog;
