import {useDispatch, useSelector} from "react-redux";
import {Badge, Box, IconButton} from "@mui/material";
import {
    CheckCircleOutline,
    MenuOutlined,
    PersonOutline,
    SearchOutlined,
    ShoppingBagOutlined
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {shades} from "../../theme";
import {setIsCartOpen} from "../../state";
import axios from 'axios';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isLoggedIn = localStorage.getItem('jwt') && localStorage.getItem('user');
    const iconSize = 22;

    const handleProfile = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users/me');

            if (response.data["isAdmin"]) {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        } catch (error) {
            localStorage.removeItem('jwt');
            navigate('/auth/login');
        }
    };

    return (
        <Box
            id="navbar"
            display="flex"
            alignItems="center"
            width="100%"
            height="50px"
            backgroundColor="rgba(255, 255, 255, 1)"
            color="black"
            position="fixed"
            top="0"
            left="0"
            zIndex="100"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    className="navbar-button"
                    onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {cursor: "pointer"},
                        color: shades.secondary[500],
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                >
                    BAKE MY DAY
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    columnGap="20px"
                >
                    <IconButton
                        className="navbar-button"
                        onClick={() => navigate("/search")}
                        sx={{color: "black"}}
                    >
                        <SearchOutlined style={{fontSize: iconSize}}/>
                    </IconButton>

                    <Badge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        badgeContent={isLoggedIn ? <CheckCircleOutline style={{fontSize: 16, color: 'green'}}/> : null}
                    >
                        <IconButton
                            className="navbar-button"
                            onClick={handleProfile}
                            sx={{color: "black"}}
                        >
                            <PersonOutline style={{fontSize: iconSize}}/>
                        </IconButton>
                    </Badge>

                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px",
                            },
                        }}
                    >
                        <IconButton
                            className="navbar-bag-button"
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{color: "black"}}
                        >
                            <ShoppingBagOutlined style={{fontSize: iconSize}}/>
                        </IconButton>
                    </Badge>

                    <IconButton
                        className="navbar-button"
                        // onClick = {() => navigate("/")}
                        sx={{color: "black", display: "none"}}
                    >
                        <MenuOutlined style={{fontSize: iconSize}}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Navbar;