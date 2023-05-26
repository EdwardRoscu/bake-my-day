import styled from "@emotion/styled";
import {Box, Button, Divider, IconButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {shades} from "../../theme";
import {decreaseCount, increaseCount, removeFromCart, setIsCartOpen} from "../../state";
import {useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useRef} from "react";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0);

    const cartMenuRef = useRef();

    const handleClickOutside = useCallback((event) => {
        if (cartMenuRef.current && !cartMenuRef.current.contains(event.target)) {
            const isNavbarClick = event.target.closest("#navbar");
            const isNavbarButtonClick = event.target.classList.contains("navbar-button") || event.target.closest(".navbar-button");

            if (isNavbarClick && !isNavbarButtonClick) return;

            dispatch(setIsCartOpen({}));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isCartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCartOpen, handleClickOutside]);

    return (
        <Box
            display={isCartOpen ? "block" : "none"}
            backgroundColor="rgba(0, 0, 0, 0.4)"
            position="fixed"
            zIndex="90"
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
            data-testid="cart-menu"
        >
            <Box
                paddingTop="60px"
                ref={cartMenuRef}
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor="white"
            >
                <Box padding="30px" overflow="auto" height="100%">
                    <FlexBox mb="15px">
                        <Typography variant="h3">
                            SHOPPING BAG ({cart.length})
                        </Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))} data-testid="close-button">
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>
                    <Box>
                        {cart.map((item) => (
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <FlexBox p="15px 0">
                                    <Box flex="1 1 40%">
                                        <img
                                            alt={item?.name}
                                            width="140px"
                                            height="140px"
                                            src={`http://localhost:4000${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                        />
                                    </Box>
                                    <Box flex="1 1 60%">
                                        <FlexBox mb="5px">
                                            <Typography fontWeight="bold">
                                                {item.attributes.name}
                                            </Typography>
                                            <IconButton
                                                onClick={() =>
                                                    dispatch(removeFromCart({id: item.id}))
                                                }
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                        <Typography>{item.attributes.shortDescription}</Typography>
                                        <FlexBox m="15px 0" data-testid="price-id">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid ${shades.neutral[500]}`}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(decreaseCount({id: item.id}))
                                                    }
                                                >
                                                    <RemoveIcon/>
                                                </IconButton>
                                                <Typography>{item.count}</Typography>
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(increaseCount({id: item.id}))
                                                    }
                                                >
                                                    <AddIcon/>
                                                </IconButton>
                                            </Box>
                                            <Typography fontWeight="bold">
                                                ${item.attributes.price}
                                            </Typography>
                                        </FlexBox>
                                    </Box>
                                </FlexBox>
                                <Divider/>
                            </Box>
                        ))}
                    </Box>

                    {/* ACTIONS */}
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>
                        {totalPrice > 0 && (
                            <Button
                                sx={{
                                    backgroundColor: shades.primary[400],
                                    color: "white",
                                    borderRadius: 0,
                                    minWidth: "100%",
                                    padding: "20px 40px",
                                    m: "20px 0",
                                }}
                                onClick={() => {
                                    navigate("/checkout");
                                    dispatch(setIsCartOpen({}));
                                }}
                            >
                                CHECKOUT
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartMenu;
