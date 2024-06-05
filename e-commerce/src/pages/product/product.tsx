import './product.scss';
import { useEffect, useState } from 'react';
import { getProduct } from '../../services/api/getProducts';
import { IProductPage } from '../../services/api/InterfaceProduct';
import { ProductCardProps } from '../../components/productCard/productCard';
import { formattedDataForOneProduct } from '../catalog/formattedData';
import spinner from '../../assets/img/gif/spinner.gif';
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
  };

  const [productProps, setProductProps] =
    useState<ProductCardProps>(productData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const startLocation = window.location.href;
    const cutLink = startLocation.split('/');
    const idProduct: string = cutLink[cutLink.length - 1];
    const productInfo = async () => {
      try {
        const oneProduct: IProductPage = await getProduct(idProduct);
        const oneProductProps: ProductCardProps =
          formattedDataForOneProduct(oneProduct);
        // console.log(oneProduct);
        setProductProps(oneProductProps);
      } catch {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    productInfo();
  }, []);

  if (loading) {
    return <img src={spinner} alt="loading..." />;
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
          <div className="product__info-title">{productProps.description}</div>
          <div className="product__info-price">
            <span>
              {productProps.currency}
              {productProps.newPrice}
            </span>
            {productProps.onSale && (
              <span>
                {productProps.currency}
                {productProps.oldPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
