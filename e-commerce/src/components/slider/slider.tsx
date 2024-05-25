/* SVG */
import ArrowLeft from '../../assets/img/icons/arrow-left.svg';
import ArrowRight from '../../assets/img/icons/arrow-right.svg';
import Img from '../../assets/img/products/lock-sm-10.png';

function Slider() {
  return (
    <div className="slider ">
      <div className="slider__info">
        <img className="slider__info-img" src={Img} alt="img" />
        <div className="slider__info-box">
          <h1 className="slider-title">
            Golden Soft <br /> GS-200Z-5 for office
          </h1>
          <div className="slider__text">
            <div>
              The electronic door lock Golden Soft GS-200Z-5 has a luxurious
              glossy shine, clear lines, and beautiful shapes.
            </div>
            <div>Suitable for installation on wooden/interior doors.</div>
          </div>
          <div className="slider__price">
            <div className="slider__price-title">Price</div>
            <div className="slider__price-price">
              <div>$33.00 </div>
              <div>$38.00</div>
            </div>
            <button className="slider__price-btn" type="submit">
              Add to Basket
            </button>
          </div>
        </div>
      </div>
      <div className="slider__dots">
        <img className="slider__arrow left" src={ArrowLeft} alt="left" />
        <div className="slider__dots-item">
          <span className="dots-bg" />
        </div>
        <div className="slider__dots-item active">
          <span className="dots-bg" />
        </div>
        <div className="slider__dots-item">
          <span className="dots-bg" />
        </div>
        <img className="slider__arrow right" src={ArrowRight} alt="right" />
      </div>
    </div>
  );
}

export default Slider;
