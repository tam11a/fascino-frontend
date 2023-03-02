import React from "react";
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Toolbar,
	Fab,
} from "@mui/material";
import { BiMenuAltLeft } from "react-icons/bi";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const AppFooter: React.FC<{ open: boolean; toggleDrawer: () => void }> = ({
	open,
	toggleDrawer,
}) => {
	return (
		<>
			<Box sx={{ height: "67px" }} />
			<AppBar
				sx={{
					position: "fixed",
					top: "unset",
					bottom: 0,
					bgcolor: "transparent",
					boxShadow: "0",
				}}
				className="bg-primary-50"
			>
				<Toolbar
					disableGutters
					sx={{
						height: "fit-content",
						minHeight: "20px !important",
					}}
				>
					<Container
						maxWidth="lg"
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							py: 0.5,
						}}
					>
						<IconButton
							size={"large"}
							color={"primary"}
							onClick={toggleDrawer}
							className="text-primary-600"
						>
							<BiMenuAltLeft />
						</IconButton>
						<IconButton
							size={"large"}
							color={"primary"}
							component={Link}
							to="/app"
							className="text-primary-600"
						>
							<Icon icon="mdi-light:view-dashboard" />
						</IconButton>
						<Fab
							sx={{
								position: "absolute",
								top: "0",
								left: "50%",
								transform: "translate(-50%, -50%)",
								p: 0,
								fontSize: "1.8rem",
							}}
							color={"primary"}
							component={Link}
							to="/app/pos"
						>
							<Icon icon="fontisto:shopping-pos-machine" />
						</Fab>
						<div />
						<div />
						<div />

						<IconButton
							size={"large"}
							color={"primary"}
							component={Link}
							to={"/app/products"}
							className="text-primary-600"
						>
							<Icon icon="circum:shopping-basket" />
						</IconButton>
						<IconButton
							size={"large"}
							color={"primary"}
							component={Link}
							to={"/app/settings"}
							className="text-primary-600"
						>
							<Icon icon="ph:user-circle-gear-duotone" />
						</IconButton>
					</Container>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default React.memo(AppFooter);
