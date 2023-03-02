import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useToggle } from "@tam11a/react-use-hooks";
import { Box, Hidden } from "@mui/material";
import AuthContext from "@/contexts/AuthContext";

const AppDrawer = React.lazy(() => import("./Drawer"));
const TemporaryDrawer = React.lazy(() => import("./Drawer/TemporaryDrawer"));
const AppFooter = React.lazy(() => import("./Footer"));

const AppLayout: React.FC | any = () => {
	const location = useLocation();

	const auth = React.useContext(AuthContext);

	const { state: open, toggleState: toggleDrawer } = useToggle(false);

	return auth.isLoggedIn ? (
		<Box sx={{ display: "flex" }}>
			<Hidden mdDown>
				<AppDrawer
					open={open}
					toggleDrawer={toggleDrawer}
				/>
			</Hidden>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 1,
					maxWidth: "100vw",
					overflow: "hidden",
					overflowY: "auto",
				}}
			>
				<Outlet />
				<Hidden mdUp>
					<TemporaryDrawer
						open={open}
						onClose={toggleDrawer}
					/>
					<AppFooter
						open={open}
						toggleDrawer={toggleDrawer}
					/>
				</Hidden>
			</Box>
		</Box>
	) : (
		<Navigate to={`/?to=${location.pathname}`} />
	);
};

export default React.memo(AppLayout);
