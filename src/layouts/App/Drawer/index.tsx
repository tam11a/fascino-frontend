import React from "react";

import {
	Divider,
	IconButton,
	List,
	ListItemIcon,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Tooltip,
	Box,
	Paper,
	Avatar,
} from "@mui/material";

//Icons
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { Drawer, DrawerFooter, DrawerHeader } from "../components";
import { DrawerData } from "./drawerData";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import Iconify from "@components/iconify";

const AppDrawer: React.FC<{ open: boolean; toggleDrawer: () => void }> = ({
	open,
	toggleDrawer,
}) => {
	const { logout } = useAuth();
	const user = useUser();
	return (
		<>
			<Drawer
				variant="permanent"
				open={open}
			>
				<DrawerHeader></DrawerHeader>
				<Box
					sx={{
						height: "calc(100vh-128px)",
						overflow: "hidden",
						overflowY: "auto",
						mb: "60px",
					}}
				>
					{DrawerData(logout)?.map?.((item, index) => (
						<List
							key={item.title}
							subheader={
								open ? (
									<ListSubheader
										sx={{
											// color: "#000",
											fontWeight: "bold",
											textTransform: "uppercase",
											fontSize: "0.7em",
											lineHeight: "30px",
										}}
									>
										{item.title}
									</ListSubheader>
								) : index ? (
									<Divider variant={"middle"} />
								) : (
									<></>
								)
							}
						>
							{item.sublist?.map?.((navbtn) => (
								<ListItemButton
									sx={{
										justifyContent: open ? "initial" : "center",
										px: 2.5,
									}}
									key={navbtn.to || navbtn.name}
									component={navbtn.to ? Link : ListItemButton}
									to={navbtn.to}
									onClick={navbtn.function}
									disabled={navbtn.disabled}
								>
									<Tooltip
										title={navbtn.name}
										placement={"right"}
										arrow
									>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 1.5 : "auto",
												justifyContent: "center",
												fontSize: "1.5rem",
												p: 1,
												borderRadius: "4px",
											}}
											className="bg-primary-50 bg-opacity-50 text-primary-800"
										>
											{navbtn.icon}
										</ListItemIcon>
									</Tooltip>

									<ListItemText
										primary={navbtn.name}
										sx={{ opacity: open ? 1 : 0 }}
										primaryTypographyProps={{
											sx: {
												fontSize: "0.9em",
											},
										}}
									/>
								</ListItemButton>
							))}
						</List>
					))}
				</Box>
				<DrawerFooter
					sx={{
						position: "absolute",
						width: "100%",
						bottom: 0,
					}}
				>
					{open ? (
						<Paper
							elevation={0}
							sx={{
								bgcolor: "#F6F7F8",
								width: "100%",
								p: 1,
								py: 0.2,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								columnGap: 1,
							}}
						>
							<Avatar
								variant={"rounded"}
								sx={{
									bgcolor: "background.default",
									color: "primary.main",
								}}
								// className="border-solid border-2 border-slate-300 mr-2"
							>
								<Iconify icon={"material-symbols:person-rounded"} />
							</Avatar>
							<ListItemText
								primary={`${user?.firstName} ${user?.lastName}`}
								secondary={`${user?.role?.name}`}
								primaryTypographyProps={{
									variant: "subtitle2",
									sx: {
										width: "165px",
										overflow: "hidden",
										textOverflow: "ellipsis",
									},
								}}
								secondaryTypographyProps={{
									variant: "caption",
									sx: {
										width: "165px",
										overflow: "hidden",
										textOverflow: "ellipsis",
									},
								}}
							/>
							<IconButton onClick={toggleDrawer}>
								{open ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
							</IconButton>
						</Paper>
					) : (
						<IconButton onClick={toggleDrawer}>
							{open ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
						</IconButton>
					)}
				</DrawerFooter>
			</Drawer>
		</>
	);
};

export default React.memo(AppDrawer);
