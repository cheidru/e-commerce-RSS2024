import Slider from '../../components/slider/slider';
import Category from '../../components/category/category';
import SliderProduct from '../../components/sliderProducts/sliderProducts';
import CallForm from '../../components/forms/callForm/callForm';
/* SVG */
import Reason from '../../assets/img/icons/product-return.svg';
import Reason1 from '../../assets/img/icons/evaluate.svg';

function Home() {
  return (
    <main className="main container">
      <section className="slider__section">
        <div className="wrapper">
          <Slider />
        </div>
      </section>
      <section className="number">
        <div className="wrapper number__box">
          <div className="number__box__item">
            <h3 className="number__box-number">5,567</h3>
            <div className="number__box-text">Счастливых клиентов</div>
          </div>
          <div className="number__box__item">
            <h3 className="number__box-number">1245</h3>
            <div className="number__box-text">Продуктов на выбор</div>
          </div>
          <div className="number__box__item">
            <h3 className="number__box-number">372</h3>
            <div className="number__box-text">Продаж в день</div>
          </div>
          <div className="number__box__item">
            <h3 className="number__box-number">20</h3>
            <div className="number__box-text">Лет на рынке</div>
          </div>
        </div>
      </section>
      <section className="we">
        <div className="wrapper we__box">
          <h2 className="we-title">Почему GoldenService? </h2>
          <div className="we__reason">
            <div className="we__reason-item">
              <img className="we__reason-img" src={Reason} alt="img" />
              <div className="we__reason-text">
                Возврат удвоенной стоимости каждого замка в случае брака
              </div>
            </div>
            <div className="we__reason-item">
              <img className="we__reason-img" src={Reason1} alt="img" />
              <div className="we__reason-text">
                Наносим ваш логотип компании на наш продукт
              </div>
            </div>
            <div className="we__reason-item">
              <img className="we__reason-img" src={Reason} alt="img" />
              <div className="we__reason-text">
                Возврат удвоенной стоимости каждого замка в случае брака.{' '}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="categoryes">
        <div className="wrapper categoryes__box">
          <h2 className="categoryes-title">Категории</h2>
          <div className="categoryes__gallery">
            <Category />
            <Category />
            <Category />
            <Category />
          </div>
          <button className="categoryes-btn" type="submit">
            Все категории
          </button>
        </div>
      </section>
      <section className="popular-products ">
        <div className="wrapper popular-products-box">
          <h2 className="popular-products-title">Наши популярные продукты</h2>
          <SliderProduct />
        </div>
      </section>
      <CallForm />
    </main>
  );
}

export default Home;
