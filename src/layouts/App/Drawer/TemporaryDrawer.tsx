import React from "react";
import {
  Divider,
  Drawer,
  // Avatar,
  // IconButton,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
  // ListSubheader,
  // Tooltip,
} from "@mui/material";
// import { DrawerData } from "./drawerData";
// import { Link } from "react-router-dom";
// import { GrRestaurant } from "react-icons/gr";
// import { MdClose } from "react-icons/md";

const TemporaryDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "350px",
          },
        }}
      >
        {/* <ListItem
					sx={{
						columnGap: 1,
					}}
				>
					<Avatar
						src={previewGalleryImage(
							user?.vendorId,
							user?.restaurant?.profileImage
						)}
						variant={"rounded"}
						sx={{
							bgcolor: "#fff",
							color: "primary.main",
						}}
						// className="border-solid border-2 border-slate-300 mr-2"
					>
						<GrRestaurant />
					</Avatar>
					<ListItemText
						primary={user?.restaurant?.name}
						secondary={`${user?.firstName} # ${
							user?.role?.roleName?.split(" ### ")[0]
						}`}
						primaryTypographyProps={{
							variant: "subtitle2",
							noWrap: true,
						}}
						secondaryTypographyProps={{
							variant: "caption",
							noWrap: true,
						}}
					/>
					<IconButton
						size={"small"}
						onClick={onClose}
					>
						<MdClose />
					</IconButton>
				</ListItem> */}
        <Divider />
        {/* {DrawerData(auth.logout)?.map?.((item, index) => (
					<List
						sx={{ mt: 1 }}
						key={item.title}
						subheader={
							open ? (
								<ListSubheader
									sx={{
										color: "#000",
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
						{item.sublist?.map?.(
							(navbtn) =>
								!navbtn.hide && (
									<ListItemButton
										sx={{
											justifyContent: open ? "initial" : "center",
											px: 2.5,
										}}
										key={navbtn.to || navbtn.name}
										component={navbtn.to ? Link : ListItemButton}
										to={navbtn.to}
										disabled={navbtn.disabled}
										onClick={() => {
											onClose();
											if (navbtn.function) navbtn.function();
										}}
									>
										<Tooltip
											title={navbtn.name}
											placement={"right"}
										>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: open ? 1.5 : "auto",
													justifyContent: "center",
													bgcolor: "#E9E3EE",
													color: "primary.main",
													fontSize: "1.5rem",
													p: 1,
													borderRadius: "4px",
												}}
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
								)
						)}
					</List>
				))} */}
      </Drawer>
    </>
  );
};

export default TemporaryDrawer;
