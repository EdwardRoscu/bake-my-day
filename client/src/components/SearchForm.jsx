import {Container, Input, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const SearchForm = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.length > 0) {
            navigate(`/search?query=${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5">
                &#x1F370; Searching for the Best Dessert &#x1F369;
            </Typography>
            <form onSubmit={handleSubmit} data-testid="search-form-submit" type="submit">
                <Input
                    fullWidth
                    onChange={handleSearchInput}
                    className='input'
                    type="text"
                    id="search-field"
                    placeholder="What is your sweet desire?! SEARCH HERE!"
                    value={searchTerm}
                />
            </form>
        </Container>
    );
}

export default SearchForm;
