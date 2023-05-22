import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, processData = json => json) => {
    const [data, setData] = useState([]);

    const fetchData = useCallback(async () => {
        if (data.length === 0) {
            const response = await fetch(url, { method: 'GET' });
            const json = await response.json();
            setData(processData(json));
        }
    }, [url, processData, data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return data;
};

export default useFetch;