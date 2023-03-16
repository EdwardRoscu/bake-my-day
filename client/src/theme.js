import {createTheme} from '@mui/material/styles';

export const shades = {
primary: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000"
},

secondary: {
    100: "#e4ecf5",
    200: "#c8d9eb",
    300: "#adc5e1",
    400: "#91b2d7",
    500: "#769fcd",
    600: "#5e7fa4",
    700: "#475f7b",
    800: "#2f4052",
    900: "#182029"
},


neutral: {
    100: "#f6f5ef",
    200: "#eeebdf",
    300: "#e5e2d0",
    400: "#ddd8c0",
    500: "#d4ceb0",
    600: "#aaa58d",
    700: "#7f7c6a",
    800: "#555246",
    900: "#2a2923"
},
};

export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500]
        },
        secondary: {
            main: shades.secondary[500]
        },
        neutral: {
            dark: shades.neutral[700],
            main: shades.neutral[500],
            light: shades.neutral[100]
        }
    },
    typography: {
        fontFamily: ["Cinzel", "serif"].join(","),
        fontSize: 11,
        h1: {
            fontFamily: ["Playfair Display", "serif"].join(","),
            fontSize: 48,
        },
        h2: {
            fontFamily: ["Playfair Display", "serif"].join(","),
            fontSize: 36,
        },
        h3: {
            fontFamily: ["Playfair Display", "serif"].join(","),
            fontSize: 20,
        },
        h4: {
            fontFamily: ["Playfair Display", "serif"].join(","),
            fontSize: 14,
        }
    }
})