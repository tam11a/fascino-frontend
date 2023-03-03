import useAreYouSure from "@/hooks/useAreYouSure";
import handleResponse from "@/utilities/handleResponse";
import { message } from "@components/antd/message";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { useCreateRole, useGetAllPermissions } from "@/queries/role";
import { Input, InputRef, Transfer } from "antd";
import React from "react";
import { MdClose } from "react-icons/md";
import { IPermission } from "../Types/types";
import { TextAreaRef } from "antd/es/input/TextArea";

const CreateDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
	open,
	onClose,
}) => {
	const inputRef = React.useRef<InputRef>(null);
	const descRef = React.useRef<TextAreaRef>(null);

	const { data: accessListData } = useGetAllPermissions();
	const [selectedList, setSelectedList] = React.useState<string[]>([]);
	const onChange = (arlist: string[]) => {
		setSelectedList(arlist);
	};

	const { mutateAsync: createRole, isLoading: createLoading } = useCreateRole();

	const onSubmit = async () => {
		const data = {
			name: inputRef?.current?.input?.value,
			description: descRef?.current?.resizableTextArea?.textArea?.value,
			permissions: selectedList || [],
		};
		if (!inputRef?.current?.input?.value) {
			message.error("Please provide a role name.");
			return;
		}
		message.open({
			type: "loading",
			content: `Creating permissions for ${inputRef?.current?.input?.value}.`,
			duration: 0,
		});
		const res = await handleResponse(() => createRole({ data }), [201]);
		message.destroy();
		if (res.status) {
			message.success(res.message);
			inputRef.current.input.value = "";
			setSelectedList([]);
			onClose();
		} else {
			message.error(res.message);
		}
	};

	const { contextHolder: closeContextHolder, open: closeAlertOpen } =
		useAreYouSure({
			title: "Want to close?",
			okText: "Close Anyway",
			cancelText: "Cancel",
		});

	const onDialogClose = () => {
		if (selectedList.length || inputRef?.current?.input?.value) {
			closeAlertOpen(() => {
				if (inputRef?.current?.input?.value) inputRef.current.input.value = "";
				setSelectedList([]);
				onClose();
			}, <>You may have some unsaved changes which will be lost closing the dialog.</>);
		} else onClose();
	};

	return (
		<>
			{closeContextHolder}
			<Dialog
				open={open}
				onClose={onDialogClose}
				PaperProps={{
					sx: {
						width: "98vw !important",
						maxWidth: "670px !important",
					},
				}}
			>
				<DialogTitle className="flex flex-row items-center py-3 px-4">
					<ListItemText
						primary={"Create Role"}
						secondary={`Create new role with access permissions`}
						primaryTypographyProps={{
							fontWeight: "700",
							color: "#000",
						}}
						className="p-0 m-0"
					/>
					<IconButton onClick={onDialogClose}>
						<MdClose />
					</IconButton>
				</DialogTitle>
				<Divider />
				<DialogContent>
					<Typography variant={"overline"}>Role Name</Typography>
					<Input
						placeholder="Enter Role Name"
						size="large"
						className={"mb-2"}
						ref={inputRef}
					/>
					<Typography variant={"overline"}>Description</Typography>
					<Input.TextArea
						placeholder="Enter Description"
						size="large"
						className={"mb-2"}
						ref={descRef}
						showCount
						maxLength={120}
						rows={4}
					/>
					<Typography variant={"overline"}>Permissions</Typography>

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
						targetKeys={selectedList}
						showSelectAll={true}
						onChange={(s) => onChange(s)}
						// disabled={updateLoading}
					/>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						variant={"contained"}
						disabled={!selectedList.length || createLoading}
						onClick={onSubmit}
					>
						Create
					</Button>
					<Button
						variant={"outlined"}
						onClick={onDialogClose}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CreateDialog;
