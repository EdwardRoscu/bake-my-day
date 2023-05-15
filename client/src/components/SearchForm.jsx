import {  Container, Input, Typography } from "@mui/material";
import {  useNavigate} from "react-router-dom";
import { useState } from "react";

const SearchForm = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm.length > 0){
            navigate(`/search?query=${searchTerm}`);
            window.location.reload();
            document.querySelector('input').value = '';
            setSearchTerm('');
        }
    };

    return (

        <Container maxWidth="s">
            <Typography variant="h5">&#x1F370; Searching for the Best Dessert 	&#x1F369;</Typography>

            <form onSubmit={handleSubmit} >
                <Input
                    fullWidth
                    onChange={handleSearchInput}
                    margin="normal"
                    className='input'
                    type="text"
                    id="search-field"
                    placeholder="What is your sweet desire?! SEARCH HERE!"
                />
            </form>
        </Container>
    );
}

export default SearchForm;