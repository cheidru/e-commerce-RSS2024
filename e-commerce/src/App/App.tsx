import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Catalog from '../pages/catalog/catalog';
import Product from '../pages/product/product';
import Basket from '../pages/basket/basket';
import About from '../pages/about/about';
import Login from '../pages/login/login';
import Registration from '../pages/registration/registration';
import Profile from '../pages/profile/profile';
import Unknown from '../pages/unknown/unknown';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

import './app.scss';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="product" element={<Product />} />
          <Route path="basket" element={<Basket />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Unknown />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
