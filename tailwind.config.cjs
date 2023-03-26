/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#f58eb3",
					light: "#f8b0ca",
					dark: "#ac637d",
					50: "#fcdde8",
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
		},
	},
	plugins: [],
	important: true,
};
