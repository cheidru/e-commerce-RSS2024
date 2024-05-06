import { Outlet, NavLink } from 'react-router-dom';
import './layout.css';

const setActive = ({ isActive }: { isActive: boolean }): string =>
  isActive ? 'active-link' : '';

function Layout() {
  return (
    <>
      <nav className="layout-nav">
        <ul className="layout-nav-list">
          <li>
            <NavLink to="/" className={setActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={setActive}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={setActive}>
              Catalog
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className={setActive}>
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/basket" className={setActive}>
              Basket
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={setActive}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/registration" className={setActive}>
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={setActive}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
