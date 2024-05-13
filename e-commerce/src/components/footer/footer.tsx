/* SVG */
import VK from '../../assets/img/icons/vk.svg';
import FB from '../../assets/img/icons/fb.svg';
import TW from '../../assets/img/icons/twitter.svg';
import Logo from '../../assets/img/icons/Logo-footer.svg';

function Footer() {
  return (
    <footer className="footer container">
      <div className="footer__box wrapper">
        <div className="footer__top">
          <div className="footer__top-item">
            <img className="footer-icon" src={Logo} alt="logo" />
            <img className="footer-icon" src={VK} alt="vk" />
            <img className="footer-icon" src={TW} alt="twetter" />
            <img className="footer-icon" src={FB} alt="facebook" />
          </div>
          <div className="footer__top-item footer__contact">
            <div className="footer__contact-title">Наши контакты</div>
            <div className="footer__contact-text">Телефоны</div>
            <a className="footer__contact-tell" href="tel:+79885650038">
              +7 (988) 565 00 38
            </a>
            <a className="footer__contact-tell" href="tel:+375336628256">
              +375 33 662 82 56
            </a>
            <div className="footer__contact-text">Email</div>
            <a
              className="footer__contact-email"
              href="mailto:vladpertcev@mail.ru"
            >
              vladpertcev@mail.ru
            </a>
            <a
              className="footer__contact-email"
              href="mailto:korobko416@gmail.com"
            >
              korobko416@gmail.com
            </a>
          </div>
          <div className="footer__top-item">
            <div className="footer__contact-title">Наш адрес</div>
            <div className="footer__contact-adress">
              Россия, Ростов-на-Дону
              <br /> ул. Богачева, 16
            </div>
          </div>
          <div className="footer__top-item">
            <div className="footer__contact-title">Информация</div>
            <div className="footer__contact-page">Доставка и оплата</div>
            <div className="footer__contact-page">Гарантии</div>
            <div className="footer__contact-page">Возврат товара</div>
          </div>
        </div>
        <a
          className="footer__bottom"
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
        >
          © 2024 The Rolling Scopes School
        </a>
      </div>
    </footer>
  );
}

export default Footer;
