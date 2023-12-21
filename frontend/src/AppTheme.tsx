import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {
        primary: {
            main: '#F0ECE5',
            light: `#CB023C`,
            dark: `#09A7E8`,

        },
        secondary: {
            main: '#B6BBC4',
        },

        background: {
            default: '#31304D',
        },
    },
});

export default theme;