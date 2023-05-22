import React, {useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import {Typography} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useSelector} from "react-redux";

const ShoppingList = () => {
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const breakPoint = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const cakesItems = items.filter(
        (item) => item.attributes.category === "cakes"
    );
    const cookiesItems = items.filter(
        (item) => item.attributes.category === "cookies"
    );
    const piesItems = items.filter(
        (item) => item.attributes.category === "pies"
    );

    const sharedTabStyles = {
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.015)',
        },
    };

    return (
        <Box width="80%" margin="50px auto">
            <Typography variant="h2" textAlign="center">
                Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{sx: {display: breakPoint ? "block" : "none"}}}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                    },
                    "& .MuiTab-root": {
                        typography: "body1",
                        fontSize: "16px",
                    },
                }}
            >
                <Tab label="ALL" value="all" sx={sharedTabStyles}/>
                <Tab label="CAKES" value="cakes" sx={sharedTabStyles}/>
                <Tab label="COOKIES" value="cookies" sx={sharedTabStyles}/>
                <Tab label="PIES" value="pies" sx={sharedTabStyles}/>
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.5%"
                minHeight="400px"
            >
                {value === "all" &&
                    items.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "cakes" &&
                    cakesItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "cookies" &&
                    cookiesItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "pies" &&
                    piesItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
            </Box>
        </Box>
    );
};

export default ShoppingList;