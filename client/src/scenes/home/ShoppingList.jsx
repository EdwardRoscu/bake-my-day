import React, {useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../state';
import { Typography } from "@mui/material";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  const cakes = items.filter(
    (item) => item.attributes.category === "cakes"
  );
  const cookies = items.filter(
    (item) => item.attributes.category === "cookies"
  );
  const pies = items.filter(
    (item) => item.attributes.category === "pies"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="CAKES" value="cakes" />
        <Tab label="COOKIES" value="cookies" />
        <Tab label="PIES" value="pies" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.5%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "cakes" &&
          cakes.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "cookies" &&
          cookies.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "pies" &&
          pies.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;