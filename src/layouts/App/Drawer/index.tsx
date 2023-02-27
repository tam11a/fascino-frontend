import React from "react";

import {
	Divider,
	//   Avatar,
	IconButton,
	List,
	ListItemIcon,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Tooltip,
	Box,
	Paper,
} from "@mui/material";

//Icons
// import { GrRestaurant } from "react-icons/gr";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { Drawer, DrawerFooter, DrawerHeader } from "../components";
import { DrawerData } from "./drawerData";
// import AuthContext from "@contexts/AuthContext";
// import useUser from "@/hooks/useUser";

const AppDrawer: React.FC<{ open: boolean; toggleDrawer: () => void }> = ({
	open,
	toggleDrawer,
}) => {
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
					{DrawerData()?.map?.((item, index) => (
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
												fontSize: "2rem",
												bgcolor: "#00000010",
												p: 1,
												borderRadius: "4px",
											}}
											// className="bg-primary-50 text-primary-700"
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
							{/* <ListItemText
                primary={user?.restaurant?.name}
                secondary={`${user?.firstName} # ${
                  user?.role?.roleName?.split(" ### ")[0]
                }`}
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
              /> */}
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
