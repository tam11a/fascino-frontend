import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#F58EB3",
			light: "#f8b0ca",
			dark: "#ac637d",
			100: "#f9bbd1",
			200: "#f8b0ca",
			300: "#f699bb",
			400: "#dd80a1",
			500: "#ac637d",
			600: "#93556b",
			700: "#7b475a",
			800: "#623948",
			900: "#311c24",
		},
	},
	typography: {
		fontFamily: "Sarala, sans-serif",
		button: {
			textTransform: "unset",
		},
	},
});

export default theme;
