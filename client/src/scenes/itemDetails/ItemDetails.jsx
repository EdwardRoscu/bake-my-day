import {Box, Button, IconButton, Typography} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {shades} from "../../theme";
import {addToCart, increaseCount} from "../../state";
import {useDispatch, useSelector} from "react-redux";
import {useFetch} from "../../hooks/useFetch";
import axios from "axios";

const ItemDetails = () => {
    const navigate = useNavigate();
    const itemsInCart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const {itemId} = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const items = useFetch("http://localhost:4000/api/items?populate=image", json => json.data);

    const [isAdmin, setIsAdmin] = useState(false);  // State to track admin status

    useEffect(() => {
        async function checkAdminStatus() {
            try {
                const response = await axios.get('http://localhost:4000/api/users/me');
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                // Handle error fetching admin status (e.g., user not logged in)
                setIsAdmin(false);  // Assuming non-admin for simplicity
            }
        }

        checkAdminStatus();
    }, []);

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:4000/api/items/${itemId}`);
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        async function getItem() {
            const item = await fetch(
                `http://localhost:4000/api/items/${itemId}?populate=image`,
                {method: "GET"}
            );
            const itemJson = await item.json();
            setItem(itemJson.data);
        }

        getItem();
    }, [itemId]);

    const handleAddToCart = () => {
        const itemInCart = itemsInCart.find(cartItem => cartItem.id === item.id);
        if (!itemInCart) {
            dispatch(addToCart({item: {...item, count}}));
        } else {
            dispatch(increaseCount({id: item.id, count}));
        }
    }

    return (
        <Box width="85%" m="60px auto">
            <Box display="flex" flexWrap="wrap" columnGap="60px">
                {/* IMAGES */}
                <Box flex="1 1 40%" mb="30px">
                    <img
                        alt={item?.name}
                        width="100%"
                        height="100%"
                        src={`http://localhost:4000${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        style={{objectFit: "contain"}}
                    />
                </Box>

                {/* ACTIONS */}
                <Box flex="1 1 50%" mb="30px">
                    {/* DELETE BUTTON - Visible to Admins only */}
                    <Box sx={{textAlign: 'right', paddingTop: '10px'}}>
                        {isAdmin && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete Item
                            </Button>
                        )}
                    </Box>

                    <Box m="65px 0 25px 0">
                        <Typography variant="h3">{item?.attributes?.name}</Typography>
                        <Typography>${item?.attributes?.price}</Typography>
                        <Typography sx={{mt: "20px"}}>
                            {item?.attributes?.shortDescription}
                        </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" minHeight="50px">
                        <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.neutral[300]}`}
                            mr="20px"
                            p="2px 5px"
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveIcon/>
                            </IconButton>
                            <Typography sx={{p: "0 5px"}}>{count}</Typography>
                            <IconButton onClick={() => setCount(Math.min(count + 1, 50))}>
                                <AddIcon/>
                            </IconButton>
                        </Box>
                        <Button
                            sx={{
                                backgroundColor: "#222222",
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px",
                            }}
                            onClick={handleAddToCart}
                        >
                            ADD TO CART
                        </Button>
                    </Box>
                    <Box>
                        <Box m="20px 0 5px 0" display="flex">
                            <FavoriteBorderOutlinedIcon/>
                            <Typography sx={{ml: "5px"}}>ADD TO WISHLIST</Typography>
                        </Box>
                        <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* INFORMATION */}
            <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description"/>
                    <Tab label="REVIEWS" value="reviews"/>
                </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="15px">
                {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {value === "reviews" && <div>reviews</div>}
            </Box>

            {/* RELATED ITEMS */}
            <Box mt="50px" width="100%">
                <Typography variant="h3" fontWeight="bold">
                    Related Products
                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-between"
                >
                    {items.slice(0, 4).map((item, i) => (
                        <Item key={`${item.name}-${i}`} item={item}/>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ItemDetails;