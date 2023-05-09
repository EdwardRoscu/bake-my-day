import { Box, Container, Input, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import { useDispatch } from "react-redux";

const Search = ({}) => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [value, setValue] = useState("");
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    async function getItem() {
        const item = await fetch(
            `http://localhost:4000/api/items/${itemId}?populate=image`,
            { method: "GET" }
        );
        const itemJson = await item.json();
        setItem(itemJson.data);
    }

    async function getItems() {
        const items = await fetch(
            `http://localhost:4000/api/items?populate=image`,
            { method: "GET" }
        );
        const itemsJson = await items.json();
        setItems(itemsJson.data);
    }

    useEffect(() => {
        getItem();
        getItems();
    }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      
        <Box width="80%" m="100px auto">
          <Container maxWidth="s">
          <Typography variant="h5">Searching for the Best Dessert &#x1F50E;</Typography>
          
            <Box>
              <Input
                fullWidth
                onChange={(event) => {setValue(event.target.value);}}
                margin="normal" 
                type="text"
                id="search-field"
                className="form-control"
                placeholder="What is your sweet desire?! SEARCH HERE!"
              />
            </Box>
            <Box>
               {
                item?.filter((searched) => {
                  if(value == ""){
                     return searched;
                  } else if(searched.name.toLowerCase().includes(value.toLowerCase())){
                     return searched;
                  }
                })
                .map((searched) => {
                  return(
                  <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-between"
                    >
                     <Item key={`${searched.name}`} item={searched} />
                  </Box>
                  )
                })
               } 
             </Box>
          </Container>
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
                        <Item key={`${item.name}-${i}`} item={item} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Search;