import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <NavLink to="/">Главная</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/catalog">Каталог</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/product">Оптовая продажа</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/about">О нас</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
