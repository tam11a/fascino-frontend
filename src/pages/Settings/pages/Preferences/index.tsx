import React from "react";
import { Container, Typography } from "@mui/material";
import ToggleTheme from "./components/ToggleTheme";
import SystemLanguage from "./components/SystemLanguage";

const Preferences: React.FC = () => {
	return (
		<Container maxWidth={"xs"}>
			<Typography
				variant="h6"
				className="pt-5"
			>
				Appearance
			</Typography>
			<SystemLanguage />
			<ToggleTheme />
		</Container>
	);
};

export default Preferences;
