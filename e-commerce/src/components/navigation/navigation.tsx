import { NavLink, Link } from 'react-router-dom';
/* Redux */
import { useAppSelector } from '../../redux/hooks';

function Navigation() {
  const isUserLogged = useAppSelector((state) => state.userSlice.isUserLogged);
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
          <NavLink
            to="/registration"
            className={isUserLogged ? 'navigation__user-is-logged' : 'red'}
          >
            Registration
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink
            to="/login"
            className={isUserLogged ? 'navigation__user-is-logged' : 'red'}
          >
            Login
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <Link
            to="/"
            className={!isUserLogged ? 'navigation__user-is-logged' : 'red'}
          >
            LogOut
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
