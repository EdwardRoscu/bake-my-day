import {useTheme} from "@emotion/react";
import {Box, Typography} from "@mui/material";
import {shades} from "../../theme";
import {useNavigate} from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    const {
        palette: {neutral},
    } = useTheme();
    return (
        <Box padding="40px" backgroundColor={neutral.light}>
            <Box
                width="90%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"
            >
                <Box width="clamp(10%, 20%, 30%)">
                    <Box
                        onClick={() => {
                            navigate("/");
                        }}
                        sx={{
                            "&:hover": {cursor: "pointer"},
                            color: shades.secondary[500],
                            mb: "20px",
                            fontWeight: "bold",
                        }}
                    >
                        BAKE MY DAY
                    </Box>
                    <Typography>
                        Selling baked sweets since 2015
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        About Us
                    </Typography>
                    <Typography>
                        We are a small business whose primary goal<br/>
                        is to fulfill the wishes of our customers<br/>
                        in terms of fresh confectionery products,<br/>
                        both standard and customized.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        Customer Care
                    </Typography>
                    <Typography mb="20px">Can't find the product you want?</Typography>
                    <Typography mb="20px">Do you want a customized product?</Typography>
                    <Typography mb="20px">
                        Send us a message or come to our office!
                    </Typography>
                </Box>

                <Box width="clamp(10%, 20%, 30%)">
                    <Typography variant="h4" fontWeight="bold" mb="30px">
                        Contact Us
                    </Typography>
                    <Typography mb="20px">Str. Mureș 123, Timișoara 300425</Typography>
                    <Typography mb="20px">Email: bakemyday@gmail.com</Typography>
                    <Typography mb="20px">Phone: +40 712 345 678</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;
