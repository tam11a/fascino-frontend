import { Dialog, DialogContent, Divider, Grid, Hidden } from "@mui/material";
import React from "react";
import RoleList from "./components/RoleList";
import RoleItem from "./components/RoleItem";
import { useLocation, useNavigate } from "react-router-dom";

const Roles: React.FC = () => {
	let location = useLocation();
	const navigate = useNavigate();
	return (
		<>
			<Grid
				container
				sx={{
					height: { xs: "calc(100vh - 105px)", md: "calc(100vh - 17px)" },
				}}
			>
				<Grid
					item
					sx={{
						flexGrow: { xs: 1, md: 0.1 },
					}}
				>
					<RoleList />
				</Grid>
				<Hidden mdDown>
					<Divider
						orientation="vertical"
						flexItem
						sx={{ borderStyle: "dashed" }}
					/>
					<Grid
						item
						className={"grow"}
					>
						<RoleItem />
					</Grid>
					<Divider
						orientation="vertical"
						flexItem
						sx={{ borderStyle: "dashed" }}
					/>
				</Hidden>
			</Grid>
			<Hidden mdUp>
				<Dialog
					open={!!location.pathname?.split?.("/")[3]}
					onClose={() => navigate("/app/roles", { replace: true })}
					fullScreen
				>
					<DialogContent className="p-0">
						<RoleItem />
					</DialogContent>
				</Dialog>
			</Hidden>
		</>
	);
};

export default Roles;
