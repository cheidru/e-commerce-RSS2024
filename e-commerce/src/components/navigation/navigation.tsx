import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/catalog">Catalog</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/product">Product</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/basket">Basket</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/registration" className="red">
            Registration
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/login" className="red">
            Login
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/" className="red">
            LogOut
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
