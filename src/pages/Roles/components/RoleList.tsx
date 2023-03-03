import React from "react";
import { useGetRoles } from "@/queries/role";
import { useToggle } from "@tam11a/react-use-hooks";
import {
	Button,
	IconButton,
	InputBase,
	List,
	ListItemButton,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CreateDialog from "./CreateDialog";

const RoleList: React.FC = () => {
	const { data } = useGetRoles();
	const navigate = useNavigate();
	const [searchString, setSearchString] = React.useState<string>("");
	const { state: openCreate, toggleState: onCloseCreate } = useToggle(false);
	return (
		<>
			<List
				disablePadding
				sx={{
					position: "relative",
					bgcolor: "#fff",
					width: "100%",
					borderRadius: "4px",
					// height: { xs: "calc(100vh - 100px)", md: "calc(100vh - 110px)" },
					height: "100%",
					overflow: "hidden",
					overflowY: "auto",
				}}
			>
				<ListSubheader
					sx={{
						bgcolor: "#F4F5F7",
						m: 1,
						p: 0.5,
						minHeight: "56px",
						minWidth: "36px",
						columnGap: 1.5,
						borderRadius: 1,
						overflow: "hidden",
					}}
					className="flex flex-row items-center gap-x-3"
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search Role"
						value={searchString}
						onChange={(e) => setSearchString(e.target.value)}
					/>
					<IconButton
						type="button"
						sx={{ p: "10px", color: "#D4D4D4" }}
						aria-label="search"
						disabled={!searchString}
						onClick={() => setSearchString("")}
					>
						{searchString ? <MdClose /> : <BiSearch />}
					</IconButton>
				</ListSubheader>
				{data?.data?.data?.map?.(
					(d: any) =>
						(!searchString ||
							d.name
								?.toLowerCase?.()
								.includes?.(searchString?.toLowerCase?.())) && (
							<ListItemButton
								sx={{
									position: "relative",
									m: 1,
									p: 0.5,
									px: 1.5,
									minHeight: "56px",
									minWidth: "36px",
									columnGap: 1.5,
									borderRadius: 1,
									overflow: "hidden",
								}}
								key={d._id}
								onClick={() =>
									navigate(`/app/roles/${d._id}`, { replace: true })
								}
								// selected={selected ? selected?.roleID === d.roleID : false}
							>
								<ListItemText
									primary={d?.name}
									secondary={`${d?.permissions?.length || 0} ${
										(d?.permissions?.length || 0) > 1
											? "Permissions"
											: "Permission"
									}`}
								/>
							</ListItemButton>
						)
				)}
				{/* <AccessMargin to={defaultPermissions.ROLES.FULL}> */}
				<div className={"px-2 absolute w-full bottom-1 md:bottom-3"}>
					<Button
						variant={"contained"}
						size="large"
						fullWidth
						className="py-3 rounded-lg"
						onClick={onCloseCreate}
					>
						Create Role
					</Button>
				</div>
				{/* </AccessMargin> */}
				<CreateDialog
					open={openCreate}
					onClose={onCloseCreate}
				/>
			</List>
		</>
	);
};

export default RoleList;
