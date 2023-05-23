import {Box, IconButton, Typography, useMediaQuery} from "@mui/material";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {shades} from "../../theme";
import {useNavigate} from "react-router-dom";

const importAll = (r) =>
    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {});

export const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg|jpg)$/)
);

const MainCarousel = () => {
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const arrowSize = 50;
    const arrowSizeHover = 60;
    return (
        <Box position="relative">
            <Carousel
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={true}
                showStatus={false}
                autoPlay={true}
                interval={5000}
                renderArrowPrev={onClickHandler => (
                    <IconButton
                        onClick={onClickHandler}
                        disableRipple
                        sx={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "0",
                            color: "white",
                            zIndex: "20",
                            '&:hover': {
                                '& svg': {fontSize: arrowSizeHover},
                                transform: 'translateY(-50%)'
                            }
                        }}
                    >
                        <NavigateBeforeIcon sx={{fontSize: arrowSize}}/>
                    </IconButton>
                )}
                renderArrowNext={onClickHandler => (
                    <IconButton
                        onClick={onClickHandler}
                        disableRipple
                        sx={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            right: "0",
                            color: "white",
                            zIndex: "20",
                            '&:hover': {
                                '& svg': {fontSize: arrowSizeHover},
                                transform: 'translateY(-50%)'
                            }
                        }}
                    >
                        <NavigateNextIcon sx={{fontSize: arrowSize}}/>
                    </IconButton>
                )}
            >
                {Object.values(heroTextureImports).map((texture, index) => (
                    <Box key={`carousel-image-${index}`}>
                        <img
                            src={texture}
                            alt={`carousel-${index}`}
                            style={{
                                width: "100%",
                                height: "600px",
                                objectFit: "cover",
                                backgroundAttachment: "fixed",
                            }}
                        />
                    </Box>
                ))}
            </Carousel>
            <Box
                color="white"
                padding="20px"
                borderRadius="1px"
                textAlign="left"
                backgroundColor="rgb(0, 0, 0, 0.8)"
                position="absolute"
                top="50%"
                left={isNonMobile ? "10%" : "0"}
                right={isNonMobile ? undefined : "0"}
                margin={isNonMobile ? undefined : "0 auto"}
                maxWidth={isNonMobile ? undefined : "240px"}
                zIndex="10"
                sx={{
                    "&:hover": {cursor: "pointer"},
                    color: shades.secondary[500],
                    fontSize: "20px",
                    fontWeight: "bold"
                }}
                onClick={() => navigate("/search?query=cake")}
            >
                <Typography color={shades.secondary[200]}>New Products</Typography>
                <Typography variant="h1">It's Cake o'clock!</Typography>
                <Typography
                    fontWeight="bold"
                    color={shades.secondary[300]}
                    sx={{textDecoration: "underline"}}
                >
                    Discover More
                </Typography>
            </Box>
        </Box>
    );
};

export default MainCarousel;