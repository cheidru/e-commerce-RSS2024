import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/* Components */
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
/* Pages */
import * as Pages from '../pages/pages';
/* Style */
import './app.scss';
import { useAppDispatch } from '../redux/hooks';
import { setAppToken, setAnonymousToken } from '../redux/store/appSlice';
import { logout, setUserLogged } from '../redux/store/userSlice';
import { getAppToken } from '../services/api/getAppToken';
import { getAnonymousToken } from '../services/api/getAnonymousToken';
import { getCustomerInfo } from '../services/api/getCustomerInfo';

function App() {
  const navigate = useNavigate();
  const startLocation = window.location.href;
  let navigateTo = '';
  if (startLocation.includes('#')) {
    const startLocationParts = startLocation.split('#');
    if (startLocationParts.length === 2) {
      navigateTo = `/${startLocationParts[1]}`;
    }
  }
  const dispatch = useAppDispatch();
  const getInitialData = async () => {
    const appToken = await getAppToken();
    dispatch(setAppToken(appToken));
    const userInfo = await getCustomerInfo();
    if (!userInfo) dispatch(logout());
    else dispatch(setUserLogged(userInfo));

    const anonymousToken = await getAnonymousToken();
    dispatch(setAnonymousToken(anonymousToken));
    // console.log('anonymousToken', anonymousToken);

    if (navigateTo) {
      navigate(`/${navigateTo}`);
    }
  };
  useEffect(() => {
    getInitialData();
  });

  return (
    <>
      <Header />
      <main className="main container">
        <Routes>
          <Route path="/">
            <Route index element={<Pages.Home />} />
            <Route path="/index" element={<Pages.Home />} />
            <Route path="/index.html" element={<Pages.Home />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/registration" element={<Pages.Registration />} />
            <Route path="/about" element={<Pages.About />} />
            <Route path="/catalog" element={<Pages.Catalog />} />
            <Route path="/product/:id" element={<Pages.Product />} />
            <Route path="/profile" element={<Pages.Profile />} />
            <Route path="/basket" element={<Pages.Basket />} />
            <Route path="/*" element={<Pages.Unknown />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
