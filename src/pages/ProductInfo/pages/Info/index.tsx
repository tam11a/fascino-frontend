import React from "react";
import handleResponse from "@/utilities/handleResponse";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Cascader, Input, Switch } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Button, IconButton, ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";

import { message } from "@components/antd/message";
import { useGetProductById, useUpdateProduct } from "@/queries/products";
import useCategory from "@/hooks/useCategory";
import Barcode from "react-jsbarcode";
import { useReactToPrint } from "react-to-print";
import Iconify from "@components/iconify";

const Info: React.FC = ({}) => {
	const { pid } = useParams();

	const { reset, handleSubmit, control } = useForm({});

	const { data: productData } = useGetProductById(pid);
	const { mutateAsync: updateProduct } = useUpdateProduct();

	const { catNSubcat, searchCatNSubcat, isCatNSubcatLoading } = useCategory();

	React.useEffect(() => {
		if (!productData) return;
		reset({
			name: productData?.data?.data?.name,
			description: productData?.data?.data?.description,
			catNSubcat: [
				productData?.data?.data?.category?._id,
				productData?.data?.data?.subcategory?._id,
			],
			price: productData?.data?.data?.price,
			barcode: productData?.data?.data?.barcode,
		});
	}, [productData]);

	const onSubmit = async (data: any) => {
		message.open({
			type: "loading",
			content: "Updating Product Information..",
			duration: 0,
		});
		const res = await handleResponse(
			() =>
				updateProduct({
					id: pid,
					data: {
						...data,
						category: data?.catNSubcat?.[0],
						subcategory: data?.catNSubcat?.[1],
					},
				}),
			[200]
		);
		message.destroy();
		if (res.status) {
			message.success("Information updated successfully!");
		} else {
			message.error(res.message);
		}
	};

	const printRef = React.useRef(null);

	const [hide, setHide] = React.useState({
		name: false,
		barcode: false,
	});

	const reactToPrintContent = React.useCallback(() => {
		return printRef.current;
	}, [printRef.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "Barcodes from Fascino",
		removeAfterPrint: true,
		pageStyle: `
	  @page {
		// size: 2.17in 0.71in;
		margin: 0in 0.4in 0.67in 0.95in;
	  }
  
	  @media all {
		.pageBreak {
		  display: none
		}
	  }
  
	  @media print {
		.pageBreak {
		  page-break-before: always
		}
	  }
	  `,
	});

	return (
		<>
			<Container maxWidth={"xs"}>
				<form
					className="py-3 grid grid-cols-1 mt-3"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="hidden">
						<div
							ref={printRef}
							// className="hidden"
						>
							{/* <p className="text-[0.5rem] text-center">
								{productData?.data?.data?.barcode}
							</p> */}
							{productData?.data?.data?.barcode && (
								<Barcode
									value={productData?.data?.data?.barcode || ""}
									options={{
										width: 1,
										text:
											!hide.name || !hide.barcode
												? `${!hide.name ? productData?.data?.data?.name : ""}${
														hide.barcode && hide.name ? " - " : ""
												  }${
														!hide.barcode
															? `${productData?.data?.data?.barcode}`
															: ""
												  }`
												: "",
										displayValue: !hide.name || !hide.barcode,
										fontOptions: "bold",
										format: "CODE128",
										fontSize: 8,
										height: 50,
									}}
									// className="scale-50"
								/>
							)}
						</div>
					</div>
					<div className="pl-4 flex flex-row border-2 rounded items-center mb-2">
						<ListItemText
							primary={productData?.data?.data?.barcode}
							secondary={"Product Barcode"}
							primaryTypographyProps={{
								className: "font-bold",
							}}
							className="font-bold"
						/>

						<div className="mr-4">
							<IconButton onClick={() => handlePrint()}>
								<Iconify icon={"material-symbols:print-add-outline-rounded"} />
							</IconButton>
						</div>
						<div className="mr-2">
							<div className="flex flex-row items-center justify-between gap-5 w-full">
								<p className="text-sm">Show Name</p>{" "}
								<Switch
									size="small"
									checked={!hide.name}
									onChange={(c) =>
										setHide((h) => ({
											...h,
											name: !c,
										}))
									}
								/>
							</div>
							<div className="flex flex-row items-center justify-between gap-5 w-full">
								<p className="text-sm">Show Code</p>{" "}
								<Switch
									size="small"
									checked={!hide.barcode}
									onChange={(c) =>
										setHide((h) => ({
											...h,
											barcode: !c,
										}))
									}
								/>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
						<div className="flex flex-col relative">
							<Label>Name</Label>
							<Controller
								control={control}
								name={"name"}
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
					<div className="flex flex-col">
						<Label>Barcode</Label>
						<Controller
							control={control}
							name={"barcode"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Input
									// className="w-1/2"
									placeholder="Product Barcode"
									size="large"
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									status={error ? "error" : ""}
								/>
							)}
						/>
					</div>
					<div className="flex flex-col">
						<Label>Category</Label>
						<Controller
							control={control}
							name={"catNSubcat"}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error },
							}) => (
								<Cascader
									size="large"
									placeholder="Search category, subcategory.."
									allowClear={false}
									value={value}
									showSearch
									options={catNSubcat}
									onSearch={searchCatNSubcat}
									loading={isCatNSubcatLoading}
									onChange={onChange}
									onBlur={onBlur}
									className="w-full"
									status={error ? "error" : ""}
									//   disabled={isLoading}
								/>
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
					<Button
						variant="contained"
						size="large"
						fullWidth
						className="my-4"
						type="submit"
						//need to add category system
					>
						Update Information
					</Button>
				</form>
			</Container>
		</>
	);
};

export default Info;
