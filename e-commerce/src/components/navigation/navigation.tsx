import { NavLink, Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

/* Redux */
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../services/api/login';

function Navigation() {
  const isUserLogged =
    useAppSelector((state) => state.userSlice.authToken.access_token).length >
    0;
  const dispatch = useAppDispatch();
  const userLogout = () => {
    logout(dispatch);
  };
  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__list-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/catalog">Catalog</NavLink>
          </li>
          <li className="navigation__list-item">
            <NavLink to="/about">About Us</NavLink>
          </li>
          {/* <li className="navigation__list-item">
          <NavLink to="/profile" className={!isUserLogged ? 'none' : 'red'}>
            Profile
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/registration" className={isUserLogged ? 'none' : 'red'}>
            Registration
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink to="/login" className={isUserLogged ? 'none' : 'red'}>
            Login
          </NavLink>
        </li> */}
          <li className="navigation__list-item">
            <Link
              to="/"
              className={!isUserLogged ? 'none' : 'red'}
              onClick={userLogout}
            >
              LogOut
            </Link>
          </li>
        </ul>
      </nav>
      <div id="outer-container">
        <Menu
          pageWrapId="page-wrap burger-menu"
          outerContainerId="outer-container"
          right
        >
          <nav className="navigation-burger">
            <ul className="navigation__list-burger">
              <li className="navigation__list-item-burger">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="navigation__list-item-burger">
                <NavLink to="/catalog">Catalog</NavLink>
              </li>
              <li className="navigation__list-item-burger">
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li className="navigation__list-item-burger">
                <Link
                  to="/"
                  className={!isUserLogged ? 'none' : 'red'}
                  onClick={userLogout}
                >
                  LogOut
                </Link>
              </li>
            </ul>
          </nav>
        </Menu>
      </div>
      <main id="page-wrap" />
    </>
  );
}

export default Navigation;
