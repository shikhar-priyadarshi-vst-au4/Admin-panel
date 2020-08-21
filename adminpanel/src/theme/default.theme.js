import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
export const customTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        white: {
            100: "#ffffff"
        },
        red: {
            500: "#E53E3E"
        },
        green: {
            500: "#38A169"
        },
        yellow: {
            400: "#ECC94B"
        },
        grey: {
            50: "#F7FAFC",
            200: "#E2E8F0",
            300: "#CBD5E0",
            600: "#4A5568",
            700: "#2D3748",
            800: "#1A202C"
        },
        blue: {
            400: "#4299E1",
            900: "#1A365D"
        },
        brand: {
            900: "#1a232b",
            800: "#47a1fb",
        },
    },
    sizes: {
        ...theme.space,
        full: "100%",
        "3xs": "14rem",
        "2xs": "16rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
    },
};