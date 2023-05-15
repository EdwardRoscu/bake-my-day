import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setItems } from '../state';

export const useFetchAndDispatchItems = () => {
    const dispatch = useDispatch();

    const getItems = useCallback(async () => {
        const items = await fetch(
            "http://localhost:4000/api/items?populate=image",
            { method: "GET" }
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }, [dispatch]);

    useEffect(() => {
        getItems();
    }, [getItems]);
};

export default useFetchAndDispatchItems;