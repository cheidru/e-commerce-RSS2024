import { Link } from 'react-router-dom';
/* SVG */

import { FaRegUser } from 'react-icons/fa6';
import { GrFavorite } from 'react-icons/gr';
import { LuShoppingCart } from 'react-icons/lu';
import Logo from '../../assets/img/icons/Logo-header.svg';
import Navigation from '../navigation/navigation';

function Header() {
  return (
    <header className="container header">
      <div className="header__top wrapper">
        <div className="header__top-item">
          Скидка 10% по промокоду “ZAMOK” на все заказы до 10.09
        </div>
        <a className="header__top-item" href="tel:+79665588499">
          Обратный звонок
        </a>
      </div>
      <div className="header__bottom wrapper">
        <div className="header__bottom-item">
          <Link to="/">
            <img className="header__bottom-logo" src={Logo} alt="logo" />
          </Link>
          <Navigation />
        </div>
        <div className="header__bottom-item">
          <a className="header__bottom-tel" href="tel:+79665588499">
            +7 (966) 55 88 499
          </a>
          <Link to="/">
            <GrFavorite className="icon-header" />
          </Link>
          <Link to="/basket">
            <LuShoppingCart className="icon-header" />
          </Link>
          <Link to="/login">
            <FaRegUser className="icon-header" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
