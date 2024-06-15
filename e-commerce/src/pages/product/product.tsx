import './product.scss';
import { useEffect, useState } from 'react';
import { getProduct } from '../../services/api/getProducts';
import { ProductCardProps } from '../../components/productCard/productCard';
import { formattedDataForOneProduct } from '../catalog/formattedData';
import { addLineToCart, removeLineFromCart } from '../../services/api/cart';
import { useAppDispatch } from '../../redux/hooks';
import Spinner from '../../components/spinner/Spinner';
import ProductSlider from '../../components/slider/slider';

function Product() {
  const productData: ProductCardProps = {
    imageUrl: [''],
    onSale: false,
    title: '',
    description: '',
    newPrice: '0',
    oldPrice: '0',
    currency: '',
    id: '',
    size: '',
    color: '',
    model: '',
    inBasket: false,
  };

  const dispatch = useAppDispatch();

  const [productProps, setProductProps] =
    useState<ProductCardProps>(productData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [inBasket, setInBasket] = useState<boolean>(false);
  const [lineId, setLineId] = useState<string>('');

  useEffect(() => {
    const startLocation = window.location.href;
    const cutLink = startLocation.split('/');
    const idProduct: string = cutLink[cutLink.length - 1];
    const productInfo = async () => {
      try {
        const { oneProductData, checkInBasket, getLineId } =
          await getProduct(idProduct);
        setInBasket(checkInBasket);
        setLineId(getLineId);
        const oneProductProps: ProductCardProps = formattedDataForOneProduct(
          oneProductData,
          inBasket
        );
        setProductProps(oneProductProps);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    productInfo();
  }, [inBasket]);

  const handleBtnAddToCart = async (productId: string) => {
    const answer = await addLineToCart(dispatch, productId);
    if (!answer.isError) {
      setInBasket(true);
    }
  };
  const handleBtnRemoveToCart = async () => {
    const answer = await removeLineFromCart(dispatch, lineId);
    if (!answer.isError) {
      setInBasket(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const productImages = productProps.imageUrl.map((src, index) => ({
    src,
    id: String(index),
  }));

  return (
    <section className="product">
      <h2 className="product free-page">Product</h2>
      <div className="product-wrapper">
        <div className="product__img-box">
          <ProductSlider images={productImages} />
        </div>
        <div className="product__info">
          <div className="product__info-title">{productProps.title}</div>
          <div className="product__info-text">
            <b>Description:</b> {productProps.description}
          </div>
          <div className="product__info-price">
            <span>
              {/* {' '} */}
              <b>Price: </b>
              <b>
                <em>
                  {productProps.currency}
                  {productProps.newPrice}
                </em>
              </b>
            </span>
            {productProps.onSale && (
              <span>
                {productProps.currency}
                {productProps.oldPrice}
              </span>
            )}
          </div>
          <div className="product-addCart-btn">
            <button
              type="button"
              className="product-addCart-btn"
              disabled={inBasket}
              onClick={(e) => {
                e.stopPropagation();
                handleBtnAddToCart(productProps.id);
              }}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="product-removeCart-btn"
              disabled={!inBasket}
              onClick={(e) => {
                e.stopPropagation();
                handleBtnRemoveToCart();
              }}
            >
              Remove in the basket
            </button>
          </div>
          {productProps.size && (
            <div className="label-in-stock">
              <b>Size: </b>
              {productProps.size}
            </div>
          )}
          {productProps.color && (
            <div className="label-in-stock">
              <b>Color: </b>
              {productProps.color}
            </div>
          )}
          {productProps.model && (
            <div className="label-in-stock">
              <b>Model: </b>
              {productProps.model}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Product;
// {!productInBasket ? (
//   <button
//     type="button"
//     className="basketAdd-btn"
//     onClick={(e) => {
//       e.stopPropagation();
//       // addLineToCart(dispatch, id);
//       handleToBasketClick(id);
//     }}
//   >
//     Add to Cart
//   </button>
// ) : (
//   <button type="submit" className="basketIn-btn" disabled>
//     In the basket
//   </button>
// )}
