import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Checkout from "./scenes/checkout/Checkout";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import Admin from "./scenes/admin/Admin";
import Login from "./scenes/auth/Login";
import Register from "./scenes/auth/Register";
import Search from "./scenes/search/Search";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
      <div className="app">
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="item/:itemId" element={<ItemDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/success" element={<Confirmation />} />
              <Route path="admin" element={<Admin />} />
              <Route path="auth/login" element={<Login />} />
              <Route path="auth/register" element={<Register />} />
              <Route path="search" element={<Search />} />
            </Routes>
          </main>
          <CartMenu />
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
