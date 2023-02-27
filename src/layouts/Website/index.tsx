import AuthContext from "@/contexts/AuthContext";
import { Box } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
const WebsiteLayout: React.FC = () => {
	let [searchParams] = useSearchParams();
	const auth = React.useContext(AuthContext);

	return auth.isLoggedIn ? (
		<Navigate
			to={searchParams.get("to") || "/app"}
			replace
		/>
	) : (
		<Box
			sx={{
				backgroundImage: { xs: ``, md: `url(/public-bg.svg)` },
				height: "100vh",
				width: "100vw",
				// backgroundSize: "100%",
				backgroundSize: { xs: "60vh", md: "100%" },
				backgroundRepeat: "no-repeat",
				backgroundPositionY: { xs: "100%", md: "70%" },
				overflow: "hidden",
				overflowY: "auto",
			}}
		>
			<Outlet />
		</Box>
	);
};

export default WebsiteLayout;
