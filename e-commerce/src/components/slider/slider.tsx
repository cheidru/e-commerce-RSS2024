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
            Golden Soft <br /> GS-200Z-5 для офиса
          </h1>
          <div className="slider__text">
            <div>
              Замок дверной электронный Golden Soft GS-200Z-5 имеет роскошный
              глянцевый блеск, четкие линии, красивые формы.
            </div>
            <div>Подходит для установки на деревянную/межкомнатную дверь.</div>
          </div>
          <div className="slider__price">
            <div className="slider__price-title">Цена</div>
            <div className="slider__price-price">
              <div>33 000₽</div>
              <div>37 000₽</div>
            </div>
            <button className="slider__price-btn" type="submit">
              Добавить в корзину
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
