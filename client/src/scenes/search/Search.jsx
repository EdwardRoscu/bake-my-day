import {Box, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import Item from "../../components/Item";
import SearchForm from "../../components/SearchForm";
import {useLocation} from "react-router-dom";
import ShoppingList from "../home/ShoppingList";
import {useDispatch} from "react-redux";
import {setItems} from "../../state";

const Search = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("query");

    const [searchedItems, setSearchedItems] = useState([]);

    const getItems = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/items?populate=image`, {
                method: "GET",
            });
            const itemsJson = await response.json();
            dispatch(setItems(itemsJson.data));
        } catch (error) {
            console.error("Failed to fetch items:", error);
        }
    }, [dispatch]);

    const getSearchedItems = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/items?populate=*
                &filters[$or][0][name][$contains]=${searchTerm}
                &filters[$or][1][shortDescription][$contains]=${searchTerm}
                &filters[$or][2][longDescription][$contains]=${searchTerm}
                &filters[$or][3][category][$contains]=${searchTerm}`,
                {method: "GET"}
            );
            const searchedItemsJson = await response.json();
            setSearchedItems(searchedItemsJson.data);
        } catch (error) {
            console.error("Failed to fetch searched items:", error);
        }
    }, [searchTerm]);

    useEffect(() => {
        getItems();
        getSearchedItems();
    }, [searchTerm, getItems, getSearchedItems]);

    const getResultMessage = () => {
        if (searchedItems?.length > 0) {
            return `${searchedItems?.length} results for "${searchTerm}"`;
        } else if (!searchTerm) {
            return `Here will be your search results!`;
        } else {
            return `No results found for ${searchTerm}`;
        }
    };

    const renderItems = () => {
        return searchedItems.map(item => (
            <Item item={item} key={`${item.name}-${item.id}`}/>
        ));
    };

    return (
        <Box>
            <Box width="80%" m="70px auto">
                <SearchForm/>
                <Box m="40px auto">
                    <Typography variant="h5" style={{padding: '10px', marginLeft: '12px'}}>
                        {getResultMessage()}
                    </Typography>
                    <Box
                        margin="0 auto"
                        display="grid"
                        gridTemplateColumns="repeat(auto-fill, 300px)"
                        justifyContent="space-around"
                        rowGap="20px"
                        columnGap="1.5%"
                        minHeight="100px"
                    >
                        {renderItems()}
                    </Box>
                </Box>
            </Box>
            <ShoppingList/>
        </Box>
    );
};

export default Search;
