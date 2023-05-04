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
import { useCreateshipment } from "@/queries/shipment";
import useSupplier from "@/hooks/useSupplier";
import useProduct from "@/hooks/useProduct";

const CreateShipment: React.FC<{ open: boolean; onClose: () => void }> = ({
	open,
	onClose,
}) => {
	const user = useUser();

	const { handleSubmit, control, watch, getValues, setValue } = useForm({});
	const { mutateAsync: createShipment } = useCreateshipment();
	const { Supplier, isSupplierLoading, searchSupplier } = useSupplier();
	const { product, isproductLoading, searchProduct } = useProduct();

	const reset = () => {
		Object.keys(getValues())?.map((field: string) =>
			setValue(field, undefined)
		);
	};

	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Creating Shipment..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				createShipment({
					...data,
					stitch: data.stitch.size || data.stitch.fee ? data.stitch : undefined,
					createdBy: user.userName,
				}),
			[201]
		);
		message.destroy();
		if (res.status) {
			message.success("Shipment created successfully!");
			reset();
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

	console.log();
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
							primary={"Shipment"}
							secondary={`Create a New Shipment`}
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
						<div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
							<div className="flex flex-col relative">
								<Label>Supplier Name</Label>
								<Controller
									control={control}
									name={"supplier"}
									rules={{ required: true }}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Cascader
											size="large"
											placeholder="Search supplier..."
											allowClear={false}
											value={value}
											showSearch
											options={Supplier}
											onSearch={searchSupplier}
											loading={isSupplierLoading}
											onChange={onChange}
											onBlur={onBlur}
											className="w-full"
											status={error ? "error" : ""}
											//   disabled={isLoading}
										/>
									)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
							<div>
								<Label isRequired>Product Name</Label>
								<Controller
									control={control}
									name={"product"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Cascader
											size="large"
											placeholder="Search product..."
											allowClear={false}
											value={value}
											showSearch
											options={product}
											onSearch={searchProduct}
											loading={isproductLoading}
											onChange={onChange}
											onBlur={onBlur}
											className="w-full"
											status={error ? "error" : ""}
											//   disabled={isLoading}
										/>
									)}
								/>
							</div>
							<div>
								<Label isRequired>Quantity</Label>
								<Controller
									control={control}
									name={"quantity"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Enter Quantity Number"
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
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
							<div>
								<Label isRequired>Weight</Label>
								<Controller
									control={control}
									name={"weight"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Enter Weight"
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
								<Label isRequired>Weight Cost</Label>
								<Controller
									control={control}
									name={"weightCost"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Enter Weight Cost"
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
								<Label>Shipment Cost</Label>
								<Input
									// className="w-1/2"
									placeholder="Shipment Cost"
									size="large"
									value={watch("weight") * watch("weightCost") || 0}
									readOnly
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
							<div>
								<Label isRequired>Buying Price</Label>
								<Controller
									control={control}
									name={"buyingPrice"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Enter Buying Price"
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
								<Label>Discount</Label>
								<Controller
									control={control}
									name={"buyingDiscount"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Enter Discount"
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
								<Input
									// className="w-1/2"
									placeholder="Shipment Cost"
									size="large"
									value={watch("buyingPrice") - watch("buyingDiscount") || 0}
									readOnly
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
							{/* <div>
                <Label>Tax</Label>
                <Controller
                  control={control}
                  name={"tax"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Tax"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div> */}

							<div>
								<Label isRequired>Supplier Commision</Label>
								<Controller
									control={control}
									name={"supplierCommision"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											// className="w-1/2"
											placeholder="Enter Supplier Commision"
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
						<div>
							<Label>Stitch</Label>
							<Input.Group>
								<Controller
									control={control}
									name={"stitch.size"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											className="w-1/2"
											placeholder="Size"
											size="large"
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
										/>
									)}
								/>
								<Controller
									control={control}
									name={"stitch.fee"}
									render={({
										field: { onChange, onBlur, value },
										fieldState: { error },
									}) => (
										<Input
											className="w-1/2"
											placeholder="Fee"
											size="large"
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											status={error ? "error" : ""}
										/>
									)}
								/>
							</Input.Group>
						</div>
					</DialogContent>
					<Divider />
					<DialogActions>
						<Button
							variant={"contained"}
							// disabled={createLoading}
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

export default CreateShipment;
