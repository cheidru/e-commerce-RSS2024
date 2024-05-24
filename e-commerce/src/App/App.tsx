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
import { setAppToken, setAppAccessToken } from '../redux/store/appSlice';
import { createAccessToken } from '../services/api/getCustomerToken';
import store from '../redux/store/store';

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
  useEffect(() => {
    if (navigateTo) {
      navigate(`/${navigateTo}`);
    }
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    const appTokenStore = store.getState().appSlice.authToken;
    const currenDateValue = new Date().getTime() / 1000;
    if (
      appTokenStore.expires_in < currenDateValue &&
      appTokenStore.access_token === ''
    ) {
      dispatch(setAppAccessToken('fetching'));
      createAccessToken().then((tokenNew) => dispatch(setAppToken(tokenNew)));
    }
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
            <Route path="/product" element={<Pages.Product />} />
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
