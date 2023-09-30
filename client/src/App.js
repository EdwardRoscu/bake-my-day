import {Box} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Checkout from "./scenes/checkout/Checkout";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import AdminDashboard from "./scenes/admin/AdminDashboard";
import UserProfile from "./scenes/user/UserProfile";
import Login from "./scenes/auth/Login";
import Register from "./scenes/auth/Register";
import Search from "./scenes/search/Search";
import setupAxios from './utils/setupAxios';
import useFetchAndDispatchItems from "./hooks/useFetchAndDispatchItems";
import ScrollToTop from "./components/ScrollToTop";

function App() {

    setupAxios();
    useFetchAndDispatchItems();

    return (
        <Box className="box-container">
            <BrowserRouter>
                <Navbar/>
                <Box flex={1} paddingTop="50px">
                    <ScrollToTop/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="item/:itemId" element={<ItemDetails/>}/>
                        <Route path="checkout" element={<Checkout/>}/>
                        <Route path="checkout/success" element={<Confirmation/>}/>
                        <Route path="admin" element={<AdminDashboard/>}/>
                        <Route path="profile" element={<UserProfile/>}/>
                        <Route path="auth/login" element={<Login/>}/>
                        <Route path="auth/register" element={<Register/>}/>
                        <Route path="search" element={<Search/>}/>
                    </Routes>
                </Box>
                <CartMenu/>
                <Footer/>
            </BrowserRouter>
        </Box>
    );
}

export default App;
