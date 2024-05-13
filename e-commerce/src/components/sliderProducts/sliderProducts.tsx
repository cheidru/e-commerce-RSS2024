import ProductCard from '../productCard/productCard';
/* SVG */
import ArrowLeft from '../../assets/img/icons/arrow-right-mute.svg';
import ArrowRight from '../../assets/img/icons/arrow-right.svg';

function SliderProduct() {
  return (
    <div className="slider-product__wrapper">
      <div className="slider-product-cards">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="slider-product-arrows">
        <img className="slider__arrow left" src={ArrowLeft} alt="left" />
        <img className="slider__arrow right" src={ArrowRight} alt="right" />
      </div>
    </div>
  );
}

export default SliderProduct;
