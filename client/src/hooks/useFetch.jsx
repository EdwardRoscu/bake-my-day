import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, processData = json => json) => {
    const [data, setData] = useState([]);

    const fetchData = useCallback(async () => {
        const response = await fetch(url, { method: 'GET' });
        const json = await response.json();
        setData(processData(json));
    }, [url, processData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return data;
};

export default useFetch;