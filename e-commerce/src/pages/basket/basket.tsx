import './basket.scss';
import '../catalog/catalog.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { ProductCard } from './productCard';

function Basket() {
  const navigate = useNavigate();

  const productList = useAppSelector((state) => state.cartSlice.cart.lineItems);
  const productCards = productList.map((product) => {
    const card = {
      imageUrl: product.variant.images.map((img) => img.url),
      onSale: !!product.price.discounted,
      title: product.name.en,
      description: product.name.en,
      newPrice: product.price.discounted
        ? `${product.price.discounted.value.centAmount / 100}`
        : `${product.price.value.centAmount / 100}`,
      oldPrice: `${product.price.value.centAmount / 100}`,
      currency: product.price.value.currencyCode,
      id: product.productId,
    };
    return card;
  });

  return (
    <section className="catalog">
      <h2 className="catalog-title">Basket</h2>
      <div className="catalog-wrapper">
        <div className="catalog-products">
          <div className="catalog-product" id="catalog-product">
            {productCards.map((product) => (
              <ProductCard
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
