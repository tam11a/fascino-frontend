import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	ListItemText,
} from "@mui/material";
import { IRole } from "@/pages/Roles/types";
import { MdClose } from "react-icons/md";
import { Transfer } from "antd";
import { useGetAllPermissions, useUpdateRole } from "@/queries/role";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import { IPermission } from "../types";

const UpdateDialog: React.FC<{
	open: boolean;
	onClose: () => void;
	selected: IRole | undefined;
}> = ({ open, onClose, selected }) => {
	const { data: accessListData } = useGetAllPermissions();
	const { mutateAsync: updateRole, isLoading: updateLoading } = useUpdateRole();

	const onChange = async (arlist: string[]) => {
		if (!arlist.length) {
			message.error("Select atleast one permission for the rule.");
			return;
		}
		message.open({
			type: "loading",
			content: `Updating permissions for ${selected?.name}.`,
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				updateRole({
					roleId: selected?._id,
					data: {
						permissions: arlist || [],
					},
				}),
			[200]
		);
		message.destroy();
		if (res.status) message.success(res.message);
		else message.error(res.message);
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				PaperProps={{
					sx: {
						width: "98vw !important",
						maxWidth: "670px !important",
					},
				}}
			>
				<DialogTitle className="flex flex-row items-center py-3 px-4">
					<ListItemText
						primary={selected?.name}
						secondary={`${selected?.permissions?.length || 0} ${
							(selected?.permissions?.length || 0) > 1
								? "Permissions"
								: "Permission"
						}`}
						primaryTypographyProps={{
							fontWeight: "700",
							color: "#000",
						}}
						className="p-0 m-0"
					/>
					<IconButton onClick={onClose}>
						<MdClose />
					</IconButton>
				</DialogTitle>
				<Divider />
				<DialogContent className="p-1">
					<Transfer
						titles={["All", "Selected"]}
						showSearch={true}
						listStyle={{
							flex: 1,
							minHeight: "55vh",
						}}
						pagination
						dataSource={Array.from(accessListData || [], (d: IPermission) => {
							return {
								...d,
								key: `${d?._id}`,
								title: d?.description,
							};
						})}
						render={(item) => item?.title || "Untitled"}
						targetKeys={Array.from(
							selected?.permissions || [],
							(d: IPermission) => `${d?._id}`
						)}
						showSelectAll={true}
						onChange={(s) => onChange(s)}
						disabled={updateLoading}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default UpdateDialog;
