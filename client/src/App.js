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
import Profile from "./scenes/user/Profile";
import Login from "./scenes/auth/Login";
import Register from "./scenes/auth/Register";
import { Box } from "@mui/material";
import setupAxios from './utils/setupAxios';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  
  setupAxios();

  return (
      <Box className="box-container">
        <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <Box flex={1} paddingTop="60px">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="item/:itemId" element={<ItemDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/success" element={<Confirmation />} />
              <Route path="admin" element={<Admin />} />
              <Route path="profile" element={<Profile />} />
              <Route path="auth/login" element={<Login />} />
              <Route path="auth/register" element={<Register />} />
            </Routes>
          </Box>
          <CartMenu />
          <Footer />
        </BrowserRouter>
      </Box>
  );
}

export default App;
