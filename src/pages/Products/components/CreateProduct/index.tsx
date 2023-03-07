import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	ListItemText,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Cascader, Input } from "antd";
import { MdClose } from "react-icons/md";
import Label from "@components/Label";
import handleResponse from "@/utilities/handleResponse";
import useUser from "@/hooks/useUser";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useCreateProducts } from "@/queries/products";

const CreateProduct: React.FC<{ open: boolean; onClose: () => void }> = ({
	open,
	onClose,
}) => {
	const user = useUser();

	const { handleSubmit, control } = useForm({});
	const { mutateAsync: createProduct } = useCreateProducts();

	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Creating Product..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				createProduct({
					...data,
					createdBy: user.userName,
				}),
			[201]
		);
		message.destroy();
		if (res.status) {
			message.success("Product created successfully!");
			onClose();
		} else {
			message.error(res.message);
		}
	};

	const { contextHolder: closeContextHolder, open: openClose } = useAreYouSure({
		title: "WANT TO CLOSE?",
		okText: "Close Anyway",
		cancelText: "Cancel",
	});

	const handleClose = () =>
		openClose(
			onClose,
			<>
				You may have some unsaved changes which will be lost closing the dialog.
			</>
		);
	{
		("");
	}
	return (
		<>
			{closeContextHolder}
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: {
						width: "98vw !important",
						maxWidth: "560px !important",
					},
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle className={"flex flex-row items-center justify-between"}>
						<ListItemText
							primary={"Product"}
							secondary={`Create a New Product`}
							primaryTypographyProps={{
								fontWeight: "700",
								color: "#000",
							}}
							className="p-0 m-0"
						/>
						<IconButton
							size="small"
							onClick={handleClose}
						>
							<MdClose />
						</IconButton>
					</DialogTitle>
					<Divider />
					<DialogContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							<div className="flex flex-col relative">
								<Label isRequired>Name</Label>
								<Controller
									control={control}
									name={"name"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Product Name"
											size="large"
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
										/>
									)}
								/>
							</div>
							<div>
								<Label>Price</Label>
								<Controller
									control={control}
									name={"price"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Product Price"
											size="large"
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
										/>
									)}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
							<div className="flex flex-col">
								<Label isRequired>Category</Label>
								<Controller
									control={control}
									name={"gender"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Cascader
											size="large"
											placeholder="Select a category"
											// expandTrigger="hover"
											allowClear={false}
											value={value}
											showSearch
											//   loading={isLoading}
											//   options={catOptions}
											onChange={onChange}
											onBlur={onBlur}
											className="w-full"
											status={error ? "error" : ""}
											//   disabled={isLoading}
										/>
										// <Select
										//   placeholder={"Category"}
										//   size={"large"}
										//   className="gender relative"
										//   onChange={onChange}
										//   onBlur={onBlur}
										//   value={value}
										//   options={[
										//     { value: "male", label: "Male" },
										//     { value: "female", label: "Female" },
										//     { value: "others", label: "Others" },
										//   ]}
										//   status={error ? "error" : ""}
										//   //   loading={isRoleLoading}
										// />
									)}
								/>
							</div>
							<div className="flex flex-col">
								<Label>Description</Label>
								<Controller
									control={control}
									name={"description"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Description.."
											size="large"
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
										/>
									)}
								/>
							</div>
						</div>
					</DialogContent>
					<Divider />
					<DialogActions>
						<Button
							variant={"contained"}
							// disabled={createLoading}
							disabled
							type={"submit"}
						>
							Create
						</Button>
						<Button
							variant={"outlined"}
							onClick={handleClose}
						>
							Cancel
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default CreateProduct;
