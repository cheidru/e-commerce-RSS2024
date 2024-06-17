import { Link } from 'react-router-dom';

/* SVG */
import { FaRegUser } from 'react-icons/fa6';
import { LuShoppingCart } from 'react-icons/lu';
import Logo from '../../assets/img/icons/Logo-header.svg';
import Navigation from '../navigation/navigation';
import { useAppSelector } from '../../redux/hooks';

function Header() {
  const userToken = useAppSelector((state) => state.userSlice.authToken);
  const userLoggedEmail =
    userToken.access_token.length > 0 ? `Hello, ${userToken.email}` : '';
  return (
    <header className="container header">
      <div className="header__bottom ">
        <div className="header__bottom-item">
          <Link to="/">
            <img className="header__bottom-logo" src={Logo} alt="logo" />
          </Link>
        </div>
        <div id="outer-container">
          <Navigation />

          <div className="header__bottom-item hello">
            {userLoggedEmail}
            <Link to="/basket">
              <LuShoppingCart className="icon-header" />
            </Link>
            <Link to="/profile">
              <FaRegUser className="icon-header" />
            </Link>
          </div>
        </div>
      </div>
      <main id="page-wrap" />
    </header>
  );
}

export default Header;
