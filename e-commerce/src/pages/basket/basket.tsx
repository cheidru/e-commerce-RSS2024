import './basket.scss';
// import '../catalog/catalog.scss';
import { useState, ChangeEvent } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { BasketCard } from './basketCard';
import {
  clearCart,
  addDiscountCode,
  clearDiscountCode,
} from '../../services/api/cart';
import { AppMessage } from '../../services/api/getAppToken';
import { findDiscountCodes } from '../../services/api/discounts';
import { Cart } from '../../redux/store/cartSlice';

export function toFixedFormat(num: number, fractionDigits: number) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function Basket() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cartSlice.cart);
  const productCards = cart.lineItems.map((product) => {
    const card = {
      lineId: product.id,
      id: product.productId,
      imageUrl: product.variant.images.map((img) => img.url),
      onSale: !!product.price.discounted,
      discounted: !!product.discountedPrice,
      title: product.name.en,
      newPrice: product.price.discounted
        ? `${toFixedFormat(product.price.discounted.value.centAmount / 100, 2)}`
        : `${toFixedFormat(product.price.value.centAmount / 100, 2)}`,
      oldPrice: `${toFixedFormat(product.price.value.centAmount / 100, 2)}`,
      salePrice: `${toFixedFormat(product.price.value.centAmount / 100, 2)}`,
      currency: product.price.value.currencyCode,
      quantity: product.quantity,
      fullPrice: `${product.totalPrice.currencyCode} ${toFixedFormat(product.totalPrice.centAmount / 100, 2)}`,
      // size: product.variant.attributes.find((attr) => attr.name === 'size')?.value,
      color: product.variant.attributes.find((attr) => attr.name === 'color')
        ?.value,
      model: product.variant.attributes.find((attr) => attr.name === 'model')
        ?.value,
    };
    if (product.discountedPrice) card.salePrice = card.newPrice;
    return card;
  });
  const cartDiscountCodes = findDiscountCodes(cart.discountCodes);

  function showToast(result: AppMessage<Cart>) {
    if (result.isError) {
      toast.error(result.message!, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'red',
          backgroundColor: 'pink',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'red',
        },
      });
    } else {
      toast.success(result.message!, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'white',
          backgroundColor: 'green',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'green',
        },
      });
    }
  }

  async function clickClearCart() {
    let result = await clearDiscountCode(dispatch);
    result = await clearCart(dispatch);
    showToast(result);
  }

  const [discountCode, setDiscountCode] = useState('');

  const handleChangeDiscountCode = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(event.target.value);
  };
  const handleClearDiscountCode = () => {
    setDiscountCode('');
  };
  async function handleAddDiscountCode() {
    // 'asinc5discount asinc7lucky'
    const result = await addDiscountCode(dispatch, discountCode);
    if (!result.isError) setDiscountCode('');
    showToast(result);
  }

  async function clickDelDiscountCode() {
    const result = await clearDiscountCode(dispatch);
    showToast(result);
  }

  return (
    <section className="basket-catalog">
      <h2 className="basket-catalog-title">Basket</h2>
      <div className="basket-catalog-wrapper">
        {productCards.length ? (
          <>
            <button
              type="button"
              className="basket-catalog-clear-button basket-catalog-buttons"
              onClick={(e) => {
                e.stopPropagation();
                clickClearCart();
              }}
            >
              Clear basket
            </button>
            <div className="basket-catalog-total-price">
              <div className="basket-catalog-total-price-current">
                Total: {cart.totalPrice.currencyCode}{' '}
                {cart.totalPrice.centAmount / 100}
              </div>
              {!!cart.discountOnTotalPrice && (
                <div className="basket-price-total-old">
                  {cart.totalPrice.currencyCode}{' '}
                  {(
                    (cart.totalPrice.centAmount +
                      cart.discountOnTotalPrice.discountedAmount.centAmount) /
                    100
                  ).toFixed(2)}
                </div>
              )}
            </div>
            <div className="basket-discount-code">
              <div className="basket-discount-code-header">Discount</div>
              <label htmlFor="discount-code" className="search-label">
                <input
                  type="input"
                  id="discount-code"
                  name="search"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={handleChangeDiscountCode}
                  className="discount-code-input"
                />
                <button
                  className="clear-btn"
                  type="button"
                  onClick={handleClearDiscountCode}
                  disabled={!discountCode}
                >
                  x
                </button>
                <button
                  className="search-btn"
                  type="button"
                  onClick={() => handleAddDiscountCode()}
                  disabled={!discountCode}
                >
                  Add
                </button>
              </label>
            </div>
            {cartDiscountCodes.length > 0 && (
              <div className="basket-discount-codes">
                {cartDiscountCodes.map((code) => (
                  <div className="basket-discount-codes-code" key={code.code}>
                    {code.code}
                  </div>
                ))}
                <button
                  type="button"
                  className="discount-code-clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    clickDelDiscountCode();
                  }}
                >
                  Clear
                </button>
              </div>
            )}
            <div className="catalog-products">
              <div className="catalog-product" id="catalog-product">
                {productCards.map((product) => (
                  <BasketCard
                    {...product}
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="basket-catalog-empty">
            <div className="basket-catalog-empty-text">Basket is empty</div>
            <div>
              {' '}
              Looks like you haven&apos;t added anything to your cart yet. Start
              shopping to fill it up!
            </div>
            <NavLink className="basket-catalog-empty-link" to="/catalog">
              <span className="basket-catalog-clear-button basket-catalog-button basket-catalog-empty-link-text">
                Go to Catalog
              </span>
            </NavLink>
          </div>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
}

export default Basket;
