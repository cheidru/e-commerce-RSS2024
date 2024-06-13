import './basket.scss';
// import '../catalog/catalog.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { BasketCard } from './basketCard';

function Basket() {
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cartSlice.cart);
  const productCards = cart.lineItems.map((product) => {
    const card = {
      lineId: product.id,
      id: product.productId,
      imageUrl: product.variant.images.map((img) => img.url),
      onSale: !!product.price.discounted,
      title: product.name.en,
      newPrice: product.price.discounted
        ? `${product.price.discounted.value.centAmount / 100}`
        : `${product.price.value.centAmount / 100}`,
      oldPrice: `${product.price.value.centAmount / 100}`,
      currency: product.price.value.currencyCode,
      quantity: product.quantity,
      fullPrice: `${product.totalPrice.currencyCode} ${product.totalPrice.centAmount / 100}`,
      // size: product.variant.attributes.find((attr) => attr.name === 'size')?.value,
      color: product.variant.attributes.find((attr) => attr.name === 'color')
        ?.value,
      model: product.variant.attributes.find((attr) => attr.name === 'model')
        ?.value,
    };
    return card;
  });

  return (
    <section className="basket-catalog">
      <h2 className="basket-catalog-title">Basket</h2>
      <div className="basket-catalog-wrapper">
        <div className="basket-catalog___total_____price">
          Total: {cart.totalPrice.currencyCode}{' '}
          {cart.totalPrice.centAmount / 100}
        </div>
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
      </div>
    </section>
  );
}

export default Basket;
