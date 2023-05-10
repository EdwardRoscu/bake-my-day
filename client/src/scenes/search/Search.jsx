import { Box, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import Item from "../../components/Item";
import SearchForm from "../../components/SearchForm";
import { useLocation } from "react-router-dom";
import ShoppingList from "../home/ShoppingList";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const Search = ({}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('query'); 
    
    const items = useSelector((state) => state.cart.items);
    const [searchedItems, setSearchedItems] = useState([]);

    const getItems = useCallback(async () => {
        const items = await fetch(
            `http://localhost:4000/api/items?populate=image`,
            { method: "GET" }
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }, [dispatch]);

    const getSearchedItems = useCallback(async () => {
        const searchedItems = await fetch(
            `http://localhost:4000/api/items?populate=*&filters[name][$contains]=${searchTerm}`,
            { method: "GET" }
        );
        const searchedItemsJson = await searchedItems.json();
        dispatch(setSearchedItems(searchedItemsJson.data));
    }, [dispatch]);
    
    useEffect(() => {
        getItems();
        getSearchedItems();
    }, [getItems]);

  
    return (
      
        <Box width="80%" m="100px auto">
            <SearchForm />
            <Box width="96%" m="40px auto">
             <Typography variant="h6"> 
             {(function(){
            if (searchedItems?.length > 0) {
                return `${searchedItems?.length} results for ${searchTerm}`
            }else if (`${searchTerm}` === "null") {
                return `Here will be your search results!`
            } else {
                return `No results found for ${searchTerm}`
            }
            }).call(this)}
             
             </Typography>
                <Box
                mt="10px"
                display="flex"
                flexWrap="wrap"
                columnGap="1.33%"
                > {searchedItems.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`} />
                ))}
                 </Box>   
            </Box>
            <ShoppingList />          
        </Box>
    );
};

export default Search;