import { IOption } from "@/hooks/useCategory/type";
import { useGetBranch } from "@/queries/branch";
import Iconify from "@components/iconify";
import {
	Divider,
	Icon,
	Button,
	Typography,
	ListItemText,
	IconButton,
	Avatar,
	List,
	ListItem,
	Drawer,
	Box,
} from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import {
	Badge,
	FloatButton,
	Select,
	Spin,
	Input,
	Switch,
	InputNumber,
	Dropdown,
} from "antd";
import React from "react";
import { useGetCustomers } from "@/queries/customer";
import CreateCustomer from "@pages/Customer/components/CreateCustomer";
// import { BarcodeScanner } from "@itexperts/barcode-scanner";
import { onBarcodeRead } from "physical-barcode-reader-observer";
import { message } from "@components/antd/message";
import { useGetScanById } from "@/queries/item";
import handleResponse from "@/utilities/handleResponse";
import { useGetTailor } from "@/queries/tailor";
import { useReactToPrint } from "react-to-print";
// import { print } from "react-html2pdf";
import { usePostOrder } from "@/queries/order";
import moment from "moment";
import { useGetEmployees } from "@/queries/employees";

import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 5);

const POS: React.FC = () => {
	const { state: open, toggleState: onClose } = useToggle(false);
	//   const { getQueryParams } = usePaginate();

	//Branch Section
	const { setSearch: setBranchSearch, getQueryParams: getBranchQueryParams } =
		usePaginate({
			defaultParams: {
				limit: 10,
			},
		});

	const { data: branchData, isLoading: isBranchLoading } = useGetBranch(
		getBranchQueryParams()
	);
	const [branches, setBranches] = React.useState<IOption[]>([]);

	React.useEffect(() => {
		if (!branchData) return;
		setBranches(
			Array.from(branchData?.data?.data || [], (d: any) => ({
				value: d?._id,
				label: d?.name,
				disabled: !d?.isActive,
				data: d,
			}))
		);
	}, [branchData]);

	const [selectedBranch, setSelectedBranch] = React.useState<
		IOption | undefined
	>(
		localStorage.getItem("sbpos")
			? JSON.parse(localStorage.getItem("sbpos") || "{}")
			: undefined
	);

	const generateInvoiceID = () => {
		return selectedBranch
			? `${selectedBranch?.data?.name
					?.charAt(0)
					.toUpperCase()}${selectedBranch?.data?.name
					?.charAt(selectedBranch?.data?.name?.length - 1)
					.toUpperCase()}-${nanoid()}`
			: `${nanoid()}`;
	};

	const [posInvoice, setPosInvoice] = React.useState(
		localStorage?.getItem("posInvoiceId") || generateInvoiceID()
	);

	React.useEffect(() => {
		if (selectedBranch)
			localStorage.setItem("sbpos", JSON.stringify(selectedBranch));
		else localStorage.removeItem("sbpos");

		setPosInvoice(generateInvoiceID());
	}, [selectedBranch]);

	React.useEffect(() => {
		localStorage.setItem("posInvoiceId", posInvoice);
	}, [posInvoice]);

	//Print Function

	const printRef = React.useRef(null);

	const reactToPrintContent = React.useCallback(() => {
		return printRef.current;
	}, [printRef.current]);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: "Invoice",
		removeAfterPrint: true,
		pageStyle: `
    @page {
      // size: 2.17in 0.71in;
      // margin: 0in 0.4in 0.67in 0.85in;
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

	const printA5Ref = React.useRef(null);

	const reactToPrintA5Content = React.useCallback(() => {
		return printA5Ref.current;
	}, [printRef.current]);

	const handlePrintA5 = useReactToPrint({
		content: reactToPrintA5Content,
		documentTitle: "Invoice",
		removeAfterPrint: true,
		pageStyle: `
    @page {
      // size: 2.17in 0.71in;
      // margin: 0in 0.4in 0.67in 0.85in;
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

	//Salesman Section
	const {
		setSearch: setEmployeeSearch,
		getQueryParams: getEmployeeQueryParams,
	} = usePaginate({
		defaultParams: {
			limit: 10,
		},
	});
	const { data: EmployeeData } = useGetEmployees(getEmployeeQueryParams());
	const [employees, setEmployees] = React.useState<IOption[]>([]);

	React.useEffect(() => {
		if (!EmployeeData) return;
		setEmployees(
			Array.from(EmployeeData?.data?.data || [], (d: any) => ({
				value: d?._id,
				label: d?.fullName,
				data: d,
				disabled: !d?.isActive,
			}))
		);
	}, [EmployeeData]);

	const [selectedEmployee, setSelectedEmployee] = React.useState<
		string | undefined
	>();

	//tailors section
	const { setSearch: setTailorSearch, getQueryParams: getTailorQueryParams } =
		usePaginate({
			defaultParams: {
				limit: 100,
			},
		});

	const { data: tailorData, isLoading: isTailorLoading } = useGetTailor(
		getTailorQueryParams()
	);
	const [tailors, setTailors] = React.useState<IOption[]>([]);

	React.useEffect(() => {
		if (!tailorData) return;
		setTailors(
			Array.from(tailorData?.data?.data || [], (d: any) => ({
				value: d?._id,
				label: d?.name,
				disabled: !d?.isActive,
			}))
		);
	}, [tailorData]);

	const [selectedTailor, setSelectedTailor] = React.useState<any>(
		localStorage.getItem("stpos")
			? JSON.parse(localStorage.getItem("stpos") || "{}")
			: null
	);
	React.useEffect(() => {
		localStorage.setItem("stpos", JSON.stringify(selectedTailor));
	}, [selectedTailor]);

	//Customers Section
	const {
		setSearch: setCustomerSearch,
		getQueryParams: getCustomerQueryParams,
	} = usePaginate({
		defaultParams: {
			limit: 10,
		},
	});

	const { data: customerData, isLoading: isCustomerLoading } = useGetCustomers(
		getCustomerQueryParams()
	);
	const [customers, setCustomers] = React.useState<IOption[]>([]);

	React.useEffect(() => {
		if (!customerData) return;
		setCustomers(
			Array.from(customerData?.data?.data || [], (d: any) => ({
				value: d?._id,
				label: (
					<ListItemText
						primary={<>{d?.name}</>}
						secondary={d?.phone}
						primaryTypographyProps={{
							className: "font-bold",
						}}
					/>
				),
				data: d,
				disabled: !d?.isActive,
			}))
		);
	}, [customerData]);

	const { state: openCreateCustomer, toggleState: onCloseCreateCustomer } =
		useToggle(false);

	const [selectedCustomer, setSelectedCustomer] = React.useState<any>(
		localStorage.getItem("scpos")
			? JSON.parse(localStorage.getItem("scpos") || "{}")
			: null
	);

	React.useEffect(() => {
		localStorage.setItem("scpos", JSON.stringify(selectedCustomer));
	}, [selectedCustomer]);

	const [posProducts, setPosProducts] = React.useState<{ [id: string]: any }>(
		localStorage.getItem("pos_products")
			? JSON.parse(localStorage.getItem("pos_products") || "{}")
			: {}
	);
	const [subTotal, setSubTotal] = React.useState(0);
	const [stitchCost, setStitchCost] = React.useState(0);
	const [discount, setDiscount] = React.useState(0);
	const [exchange, setExchange] = React.useState(0);
	const [deliveryCharge, setDeliveryCharge] = React.useState(0);
	const [paid, setPaid] = React.useState(0);
	const [temppaid, setTempPaid] = React.useState(0);
	const [payMethod, setPayMethod] = React.useState("Cash");
	const [transactions, setTransactions] = React.useState<
		{
			paid: number;
			method: string;
		}[]
	>([]);

	const [online, setOnline] = React.useState(false);
	React.useEffect(() => {
		localStorage.setItem("pos_products", JSON.stringify(posProducts));
		let amount = 0;
		let stitchAmount = 0;
		Object.values(posProducts)?.map?.((p) => {
			amount +=
				p?.product?.price +
					(!!p.stitch && !p.stitch.tailor ? p.stitch.fee : 0) || 0;
			stitchAmount += p?.tailor?.fee || 0;
		});
		setSubTotal(amount);
		setStitchCost(stitchAmount);
	}, [posProducts]);

	React.useEffect(() => {
		!online && setDeliveryCharge(0);
	}, [online]);

	const [scanType, setScanType] = React.useState(
		JSON.parse(localStorage.getItem("scanType") || "true")
	);

	//   console.log("Scan ->", scanType);

	const { mutateAsync: mutateProduct } = useGetScanById();

	const addProduct = async (id: string) => {
		const res = await handleResponse(() =>
			mutateProduct({
				id,
				params: {
					branch_id: JSON.parse(localStorage.getItem("sbpos") || "{}")?.value,
					is_product: JSON.parse(localStorage.getItem("scanType") || "true"),
					skip_products: Object.keys(
						JSON.parse(localStorage.getItem("pos_products") || "{}")
					),
				},
			})
		);
		if (res.status) {
			setPosProducts((p) => ({
				...p,
				[res.data._id]: res.data,
			}));
		} else message.error(res.message);
	};

	const { state: searchProducts, toggleState: onSearchProducts } =
		useToggle(false);

	let reader = onBarcodeRead();
	// const [products, setProducts] = React.useState<{ [id: string]: {} }>({});

	React.useEffect(() => {
		let event = reader.subscribe((result) => {
			const barcode = result.barcode;
			//   const type = result.type;
			//   const lastTarget = result.target;
			if (barcode.length >= 8) {
				// console.log(barcode, type, lastTarget, result);
				message.success(`Scanned ${scanType ? "Product" : "Item"} ${barcode}`);
				addProduct(barcode);
			}
		});
		return () => {
			event?.unsubscribe?.();
		};
	}, []);

	// React.useEffect(() => {
	//   let event: any;
	//   if (searchProducts) {
	//     event = reader.subscribe((result) => {
	//       const barcode = result.barcode;
	//       // const type = result.type;
	//       // const lastTarget = result.target;
	//       // console.log(barcode, type, lastTarget, result);
	//       message.success(`Scanned ${barcode}`);
	//     });
	//     message.loading({
	//       content: "Scanning Barcode...",
	//       duration: 10,
	//       onClose: () => onSearchProducts(),
	//     });
	//   } else {
	//     event?.unsubscribe?.();
	//   }

	//   return () => {
	//     event?.unsubscribe?.();
	//   };
	// }, [searchProducts]);

	const [searchInput, setSearchInput] = React.useState("");

	// console.log(
	//   posProducts,
	//   selectedCustomer,
	//   selectedBranch,
	//   online,
	//   payMethod,
	//   discount,
	//   paid
	// );

	const { mutateAsync: postOrder, isLoading: orderLoading } = usePostOrder();

	const submitToSave = async () => {
		message.loading("Processing...");
		var products = Array.from(Object.values(posProducts), (p: any) => ({
			id: p._id,
			price:
				p?.product?.price +
					(!!p.stitch && !p.stitch.tailor ? p.stitch.fee : 0) || 0,
			stitch: p.tailor
				? {
						size: p.tailor?.size,
						fee: p.tailor?.fee,
				  }
				: undefined,
		}));

		var err = 0;
		products?.map?.((p) => {
			if (p.stitch && !selectedTailor?.value) {
				message.destroy();
				message.error("Please Select a Tailor!");
				err = 1;
				return;
			}
		});

		if (err) return;

		const data = {
			invoice: posInvoice,
			customer: selectedCustomer?._id,
			branch: JSON.parse(localStorage.getItem("sbpos") || "{}")?.value,
			type: online ? "online" : "offline",
			discount: discount + exchange || 0,
			delivery_charge: deliveryCharge,
			products,
			tailor: selectedTailor?.value,
			transactions,
			salesman: selectedEmployee,
		};

		const res = await handleResponse(() => postOrder(data), [201]);
		if (res.status) {
			setPosInvoice(generateInvoiceID());
			localStorage.removeItem("stpos");
			localStorage.removeItem("scpos");
			localStorage.removeItem("pos_products");
			setSelectedTailor(null);
			setSelectedCustomer(null);
			setPosProducts({});
			setPaid(0);
			setExchange(0);
			setDeliveryCharge(0);
			setDiscount(0);
			setTransactions([]);
			setTempPaid(0);
			setPayMethod("Cash");
			setSelectedEmployee(undefined);
			message.success(res.message);
		} else {
			message.error(res.message);
		}
	};

	return (
		<AccessMargin
			to={defaultPermissions.POS}
			defaultFallback
		>
			{/* <Container className="py-4"> */}
			<div className="relative flex flex-row items-center justify-between gap-2 p-3 bg-slate-100 rounded-md">
				<div className="flex flex-row items-center justify-between gap-2 pl-2">
					<Icon className="text-4xl">
						<Iconify icon={"mdi:shop-outline"} />
					</Icon>
					<Select
						bordered={false}
						placeholder={"Select Your Branch"}
						allowClear
						showSearch
						defaultActiveFirstOption
						size="large"
						onClear={() => setSelectedBranch(undefined)}
						onSearch={(v) => setBranchSearch(v)}
						value={selectedBranch?.value}
						onSelect={(_v, o) => setSelectedBranch(o)}
						// onChange={(_v, o) => setSelectedBranch(o)}
						loading={isBranchLoading}
						options={branches}
						filterOption={false}
						className="min-w-sm"
					/>
				</div>
				<FloatButton.Group
					className="relative top-0 left-0"
					shape="square"
				>
					<Badge count={0}>
						<FloatButton
							icon={<Iconify icon="game-icons:sewing-machine" />}
							onClick={onClose}
							// ={!!Object.keys(tailorProducts)?.length}
						/>
					</Badge>
				</FloatButton.Group>
			</div>
			<div className="mt-5 min-h-[85vh] flex flex-col md:flex-row gap-4">
				<div className="flex-1">
					<div className="relative flex flex-row items-center justify-between gap-2 p-1">
						<div className="flex flex-row items-center justify-between gap-3 pl-2">
							<Icon className="text-3xl">
								<Iconify icon="circum:shopping-basket" />
							</Icon>
							<Typography
								variant="h5"
								className="font-semibold"
							>
								Products
							</Typography>
						</div>

						<FloatButton.Group
							className="relative top-0 left-0 flex flex-row items-center w-fit gap-1"
							shape="square"
						>
							<FloatButton
								icon={<Iconify icon="ph:barcode-duotone" />}
								onClick={() => onSearchProducts()}
							/>
							<form
								className="flex flex-row"
								onSubmit={(e) => {
									e.preventDefault();
									addProduct(searchInput);
									setSearchInput("");
								}}
							>
								<Input
									size={"small"}
									bordered={false}
									placeholder={"Search Barcode"}
									value={searchInput}
									onChange={(e) => setSearchInput(e.currentTarget.value)}
									allowClear
								/>
							</form>
							<Select
								bordered={false}
								value={scanType || "true"}
								onChange={(v) => {
									localStorage.setItem("scanType", JSON.stringify(v));
									setScanType(v);
								}}
								dropdownMatchSelectWidth={false}
								options={[
									{
										value: "true",
										label: "Product",
									},
									{
										value: "false",
										label: "Item",
									},
								]}
							/>
						</FloatButton.Group>
					</div>
					<Spin spinning={searchProducts}>
						{Object.values(posProducts)?.length > 0 ? (
							<List>
								{Object.values(posProducts)?.map?.((product: any) =>
									!!product ? (
										<ListItem key={product?._id}>
											<ListItemText
												primary={`${product?.product?.name} ${
													!!product.stitch && !product.stitch.tailor
														? `(Size - ${product.stitch.size})`
														: ""
												}`}
												secondary={`${product?.product?.category?.name}/${product?.product?.subcategory?.name}`}
												primaryTypographyProps={{
													className: "font-bold",
												}}
												secondaryTypographyProps={{
													className: "text-xs font-bold",
												}}
											/>
											<ListItemText
												className="grow-0 mx-5"
												//   primary={}
												secondary={
													product?.product?.price +
														(!!product.stitch && !product.stitch.tailor
															? product.stitch.fee
															: 0) || 0
												}
												primaryTypographyProps={{
													className: "font-bold",
												}}
												secondaryTypographyProps={{
													className: "text-xs font-bold",
												}}
											/>
											<Badge dot={!!product?.tailor}>
												<IconButton
													size="small"
													color="inherit"
													className={`rounded ${
														!!product?.tailor ? "bg-slate-100" : ""
													}`}
													onClick={() => {
														setPosProducts((t) => ({
															...t,
															[product?._id]: {
																...product,
																tailor: product.tailor
																	? undefined
																	: {
																			fee: 0,
																	  },
															},
														}));
													}}
													disabled={!!product.stitch && !product.stitch.tailor}
												>
													<Iconify icon={"game-icons:sewing-machine"} />
												</IconButton>
											</Badge>
											<IconButton
												size="small"
												color="error"
												className="rounded ml-2"
												onClick={() => {
													setPosProducts((t) =>
														JSON.parse(
															JSON.stringify({
																...t,
																[product._id]: undefined,
															})
														)
													);
												}}
											>
												<Iconify icon={"ic:baseline-delete-forever"} />
											</IconButton>
										</ListItem>
									) : (
										<></>
									)
								)}
							</List>
						) : (
							<Avatar
								src={"/boxs.svg"}
								variant="square"
								className="w-9/12 max-w-md h-auto mx-auto my-5"
							/>
						)}
					</Spin>
					<div className="flex flex-col float-right items-end gap-2 m-4 w-[95vw] max-w-[200px]">
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Typography variant="body2">Subtotal : </Typography>
							<Typography variant="body2">{subTotal} ৳</Typography>
						</div>
						{!!stitchCost && (
							<div className="w-full flex flex-row items-center gap-4 justify-between">
								<Typography variant="body2">Stitch : </Typography>
								<Typography variant="body2">{stitchCost} ৳</Typography>
							</div>
						)}
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Typography variant="body2">Discount : </Typography>
							<Typography variant="body2">{discount} ৳</Typography>
						</div>
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Typography variant="body2">Exchange : </Typography>
							<Typography variant="body2">{exchange} ৳</Typography>
						</div>
						{online === true ? (
							<div className="w-full flex flex-row items-center gap-4 justify-between">
								<Typography variant="body2">Delivery Charge : </Typography>
								<Typography variant="body2">{deliveryCharge} ৳</Typography>
							</div>
						) : (
							""
						)}
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Typography variant="body2">Total : </Typography>
							<Typography variant="body2">
								{subTotal - discount - exchange + stitchCost + deliveryCharge} ৳
							</Typography>
						</div>
						{transactions?.length > 0 && (
							<>
								-------------------------------
								{transactions.map((t) => (
									<div className="w-full flex flex-row items-center gap-4 justify-between">
										<Typography variant="body2">{t.method} : </Typography>
										<Typography variant="body2">{t.paid} ৳</Typography>
									</div>
								))}
								-------------------------------
							</>
						)}
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Typography variant="body2">Paid : </Typography>
							<Typography variant="body2">{paid} ৳</Typography>
						</div>
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Typography variant="body2">Changed Amount : </Typography>
							<Typography variant="body2">
								{paid >
								subTotal - discount - exchange + stitchCost + deliveryCharge
									? paid -
									  (subTotal -
											discount -
											exchange +
											stitchCost +
											deliveryCharge)
									: "0"}{" "}
								৳
							</Typography>
						</div>
						{/* {!!(subTotal - discount - paid + stitchCost) && ( */}
						<div className="w-full flex flex-row items-center gap-4 justify-between text-red-600">
							<Typography variant="body2">Due : </Typography>

							<Typography variant="body2">
								{subTotal - discount - exchange + stitchCost + deliveryCharge >
								paid
									? subTotal -
									  discount -
									  exchange +
									  stitchCost +
									  deliveryCharge -
									  paid
									: "0"}{" "}
								৳
							</Typography>
						</div>
						{/* )} */}
					</div>
				</div>
				<Divider
					flexItem
					orientation="vertical"
					className="border-2 border-dashed border-slate-100"
				/>
				<div className="min-w-full md:min-w-[370px] relative flex flex-col max-w-sm">
					<Typography
						variant="h5"
						className="font-semibold p-3 px-1 flex flex-row items-center justify-between"
					>
						Customer
						{!!selectedCustomer && (
							<IconButton
								color="error"
								onClick={() => setSelectedCustomer(null)}
							>
								<Iconify icon={"ic:baseline-delete-forever"} />
							</IconButton>
						)}
					</Typography>

					<div className="flex-1">
						{!!selectedCustomer ? (
							<div className="flex flex-col gap-2">
								<div>
									<Typography variant="overline">Name</Typography>
									<Typography
										variant="subtitle2"
										className="font-bold"
									>
										{selectedCustomer?.name || "N/A"}
									</Typography>
								</div>
								<div>
									<Typography variant="overline">Phone</Typography>
									<Typography
										variant="subtitle2"
										className="font-bold"
									>
										{selectedCustomer?.phone || "N/A"}
									</Typography>
								</div>
								<div>
									<Typography variant="overline">Email</Typography>
									<Typography
										variant="subtitle2"
										className="font-bold"
									>
										{selectedCustomer?.email || "N/A"}
									</Typography>
								</div>
								<div>
									<Typography variant="overline">Address</Typography>
									<Typography
										variant="subtitle2"
										className="font-bold"
									>
										{selectedCustomer?.address || "N/A"}
									</Typography>
								</div>
							</div>
						) : (
							<>
								<Avatar
									src={"/customer.svg"}
									variant="square"
									className="w-9/12 h-auto mx-auto"
								/>
								<Select
									bordered={false}
									placeholder={"Search by Phone, Name, Email.."}
									allowClear
									showSearch
									defaultActiveFirstOption
									size="large"
									onSelect={(_v, o) => setSelectedCustomer(o?.data)}
									onClear={() => setCustomerSearch("")}
									onSearch={(v) => setCustomerSearch(v)}
									loading={isCustomerLoading}
									options={customers}
									filterOption={false}
									className="w-full"
									dropdownRender={(menu) => (
										<>
											{menu}

											<Button
												variant="contained"
												fullWidth
												className="mt-1"
												startIcon={<Iconify icon={"material-symbols:add"} />}
												onClick={() => onCloseCreateCustomer()}
											>
												Create New
											</Button>
										</>
									)}
								/>
								<CreateCustomer
									open={openCreateCustomer}
									onClose={onCloseCreateCustomer}
								/>
							</>
						)}
						<Divider
							flexItem
							className="border-2 border-dashed border-slate-100 my-3"
						/>
					</div>

					<div className={"flex flex-col gap-5"}>
						<div>
							<Typography
								variant={"caption"}
								className={"font-bold pr-2"}
							>
								Online
							</Typography>
							<Switch
								checked={online}
								size="small"
								className={`${online ? "bg-primary-400" : "bg-slate-600"}`}
								onChange={(e) => setOnline(e)}
							/>
						</div>
						{online === true ? (
							<div className="flex flex-row items-center justify-between w-60 gap-5">
								<Typography
									variant={"caption"}
									className={"font-bold"}
								>
									Delivery Charge
								</Typography>
								<InputNumber
									addonAfter={<Iconify icon={"tabler:currency-taka"} />}
									size="large"
									min={0}
									className={"max-w-[7rem]"}
									value={deliveryCharge}
									onChange={(e) => setDeliveryCharge(e || 0)}
								/>
							</div>
						) : (
							""
						)}

						<div className="flex flex-row items-center justify-between w-60 gap-5 ">
							<Typography
								variant={"caption"}
								className={"font-bold"}
							>
								Exchange
							</Typography>
							<InputNumber
								addonAfter={<Iconify icon={"tabler:currency-taka"} />}
								max={subTotal + stitchCost}
								size="large"
								min={0}
								className={"max-w-[7rem]"}
								value={exchange}
								onChange={(e) => setExchange(e || 0)}
							/>
						</div>
						<div className="flex flex-row items-center justify-between w-60 gap-5">
							<Typography
								variant={"caption"}
								className={"font-bold"}
							>
								Discount
							</Typography>
							<InputNumber
								addonAfter={<Iconify icon={"tabler:currency-taka"} />}
								max={subTotal + stitchCost}
								size="large"
								min={0}
								className={"max-w-[7rem]"}
								value={discount}
								onChange={(e) => setDiscount(e || 0)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Typography
								variant={"caption"}
								className={"font-bold"}
							>
								Add Payment
							</Typography>
							<InputNumber
								// addonAfter={<Iconify icon={"tabler:currency-taka"} />}
								// max={subTotal - discount + stitchCost}
								size="large"
								min={0}
								className={"w-full"}
								value={temppaid}
								onChange={(e) => setTempPaid(e || 0)}
								addonBefore={
									<Select
										value={payMethod}
										onChange={(v) => setPayMethod(v)}
										dropdownMatchSelectWidth={false}
									>
										<Select.Option value="Cash">Cash</Select.Option>
										<Select.Option value="bKash">bKash</Select.Option>
										<Select.Option value="Card">Card</Select.Option>
										<Select.Option value="Nagad">Nagad</Select.Option>
										<Select.Option value="Rocket">Rocket</Select.Option>
										<Select.Option value="COD">COD</Select.Option>
									</Select>
								}
								addonAfter={
									<IconButton
										size="small"
										onClick={() => {
											setTransactions((t) => [
												...t,
												{
													paid: temppaid,
													method: payMethod,
												},
											]);
											setPaid((p) => p + temppaid);
											setTempPaid(0);
											setPayMethod("Cash");
										}}
									>
										<Iconify icon={"ic:baseline-add"} />
									</IconButton>
								}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Typography
								variant={"caption"}
								className={"font-bold"}
							>
								Add Salesman
							</Typography>
							<Select
								placeholder={"Select Salesman"}
								className="w-full"
								size="large"
								value={selectedEmployee}
								onSelect={(e) => setSelectedEmployee(e)}
								allowClear
								options={employees || []}
								showSearch
								filterOption={false}
								// searchValue={search}
								onSearch={(v) => setEmployeeSearch(v)}
								onClear={() => setSelectedEmployee(undefined)}
							/>
						</div>

						<Divider
							flexItem
							className="border-2 border-dashed border-slate-100 my-3"
						/>

						<div className="flex flex-row items-center justify-between gap-2">
							<div />
							<Dropdown.Button
								size="large"
								menu={{
									items: [
										{
											key: "80mm",
											label: "80mm",
											onClick: () => {
												handlePrint();
											},
										},
										{
											key: "a5",
											label: "A5",
											onClick: () => {
												handlePrintA5();
											},
										},
										{
											key: "save",
											label: "Confirm",
											danger: true,
											onClick: submitToSave,
										},
									],
								}}
								className={"w-fit"}
								loading={orderLoading}
								onClick={handlePrint}
								type="primary"
								disabled={
									!selectedBranch ||
									!Object.values(posProducts)?.length ||
									!selectedCustomer
								}
							>
								Invoice
							</Dropdown.Button>
						</div>
					</div>
				</div>
			</div>
			<Drawer
				anchor={"right"}
				open={open}
				onClose={onClose}
				PaperProps={{ className: "w-[95vw] max-w-[420px]" }}
			>
				<div className="flex flex-row items-center  gap-2  p-3 bg-slate-100">
					<Icon className="text-4xl">
						<Iconify icon={"game-icons:sewing-machine"} />
					</Icon>
					<Select
						bordered={false}
						placeholder={"Select Your Tailor"}
						allowClear
						showSearch
						defaultActiveFirstOption
						size="large"
						onClear={() => setSelectedTailor("")}
						onSearch={(v) => setTailorSearch(v)}
						value={selectedTailor?.value}
						onSelect={(_v, o) => setSelectedTailor(o)}
						loading={isTailorLoading}
						options={tailors}
						filterOption={false}
						className="min-w-sm"
					/>
				</div>
				{/* <div className="flex flex-row items-center justify-between gap-3 pl-2">
            <Icon className="text-3xl">
              
            </Icon>
            <Typography variant="h5" className="font-semibold">
              Tailor
            </Typography>
          </div> */}
				<Spin spinning={searchProducts}>
					{Object.values(posProducts)?.length > 0 ? (
						<List>
							{Object.values(posProducts)?.map?.(
								(product: any) =>
									!!product?.tailor && (
										<ListItem
											key={product?._id}
											className="gap-2"
										>
											<ListItemText
												primary={product?.product?.name}
												secondary={`${product?.product?.category?.name}/${product?.product?.subcategory?.name}`}
												primaryTypographyProps={{
													className: "font-bold",
												}}
												secondaryTypographyProps={{
													className: "text-xs font-bold",
												}}
											/>
											<Input
												className="max-w-[5rem]"
												placeholder="Size"
												value={product?.tailor?.size}
												onChange={(e) => {
													setPosProducts((p) => ({
														...p,
														[product._id]: {
															...product,
															tailor: {
																...product.tailor,
																size: e.target.value,
															},
														},
													}));
												}}
											/>
											<InputNumber
												addonAfter={<Iconify icon={"tabler:currency-taka"} />}
												min={0}
												className={"max-w-[7rem]"}
												value={product?.tailor?.fee}
												onChange={(fee) => {
													setPosProducts((p) => ({
														...p,
														[product._id]: {
															...product,
															tailor: {
																...product.tailor,
																fee,
															},
														},
													}));
												}}
											/>

											<IconButton
												size="small"
												color="error"
												className="rounded"
												onClick={() => {
													setPosProducts((p) => ({
														...p,
														[product._id]: {
															...product,
															tailor: undefined,
														},
													}));
												}}
											>
												<Iconify icon={"ic:baseline-delete-forever"} />
											</IconButton>
										</ListItem>
									)
							)}
						</List>
					) : (
						<Avatar
							src={"/boxs.svg"}
							variant="square"
							className="w-9/12 max-w-md h-auto mx-auto my-5"
						/>
					)}
				</Spin>
			</Drawer>{" "}
			{/* 
        Invoice Container
      */}
			<div className="hidden">
				<div ref={printRef}>
					<PrintableArea
						invoiceId={localStorage.getItem("posInvoiceId") || ""}
						{...{
							posProducts,
							subTotal,
							stitchCost,
							paid,
							discount,
							transactions,
							exchange,
							deliveryCharge,
							selectedCustomer,
							branch: selectedBranch,
							method: payMethod,
						}}
					/>
				</div>
				<hr className="my-5" />
				<div ref={printA5Ref}>
					<PrintableArea
						invoiceId={localStorage.getItem("posInvoiceId") || ""}
						{...{
							posProducts,
							subTotal,
							stitchCost,
							paid,
							discount,
							transactions,
							exchange,
							deliveryCharge,
							selectedCustomer,
							branch: selectedBranch,
							method: payMethod,
						}}
						isA5={true}
					/>
				</div>
			</div>
		</AccessMargin>
	);
};

export type PrintableAreaProps = {
	invoiceId: string;
	posProducts: {
		[id: string]: any;
	};
	subTotal: number;
	stitchCost: number;
	discount: number;
	exchange: number;
	transactions: {
		paid: number;
		method: string;
	}[];
	deliveryCharge: number;
	paid: number;
	selectedCustomer: {
		[id: string]: any;
	};
	branch: any;
	method?: any;
	isA5?: boolean;
};

export const PrintableArea: React.FC<PrintableAreaProps> = ({
	invoiceId,
	posProducts,
	selectedCustomer,
	branch,
	isA5 = false,
	...others
}) => {
	console.log({
		posProducts,
		selectedCustomer,
		branch,
		isA5,
		...others,
	});

	return (
		<Box
			sx={{
				"& *": {
					fontSize: "12px",
					fontFamily: "monospace !important",
				},
			}}
		>
			<div className="flex flex-row items-center justify-center gap-2">
				{/* <Avatar
					src={"/favicon.svg"}
					variant={"square"}
					sx={{
						height: "50px",
						width: "50px",
						background: "transparent",
						borderColor: "none",
					}}
				/> */}
				{isA5 ? (
					<>
						<div className="flex flex-row container items-center justify-between">
							<div className="flex items-center">
								<Avatar
									src={"/logo.svg"}
									variant={"square"}
									sx={{
										height: "auto",
										width: "120px",
										background: "transparent",
										borderColor: "none",
									}}
								/>
							</div>
							<div>
								<b>{branch?.data?.name} Showroom:</b>
								<p className={"text-xs whitespace-pre"}>
									{branch?.data?.address}
								</p>
								<p className={"text-xs"}>Tel: {branch?.data?.phone}</p>
							</div>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center">
						{/* <b className="text-lg">Fascino</b> */}
						<Avatar
							src={"/logo.svg"}
							variant={"square"}
							sx={{
								height: "auto",
								width: "120px",
								background: "transparent",
								borderColor: "none",
							}}
							className="mb-2"
						/>
						<p className={"text-xs text-center whitespace-pre"}>
							{branch?.data?.address}
						</p>
						{branch?.data?.phone && (
							<p className={"text-xs"}>Tel: {branch?.data?.phone}</p>
						)}
						<p className={"text-xs"}>Mushak 6.3</p>
					</div>
				)}
			</div>
			{/* <Divider
				flexItem
				className={"w-full mt-3 border-2 border-black"}
			>
				<b className="text-xs">Invoice Info</b>
			</Divider> */}
			<div className="flex flex-col w-full m-2">
				<div
					className={`flex ${
						isA5 ? "flex-row" : "flex-col"
					} gap-1 justify-between my-1`}
				>
					<p className={"text-xs"}>
						<b>Date:</b> {moment().format("lll")}
					</p>
					<p className={"text-xs"}>
						<b>Invoice No:</b> {invoiceId}
					</p>
				</div>

				<div
					className={`text-xs ${
						isA5 ? "bg-slate-100 rounded p-3 my-1 mt-3" : ""
					}`}
				>
					<div className="flex flex-row gap-2">
						<b>Name:</b>
						<p className="text-xs flex-1 pl-6 whitespace-pre-wrap">
							{selectedCustomer?.name}
						</p>
					</div>
					<div className="flex flex-row gap-2">
						<b>Phone: </b>
						<p className={"text-xs flex-1 pl-4 whitespace-pre-wrap"}>
							{selectedCustomer?.phone}
						</p>
					</div>
					<div className="flex flex-row gap-2">
						<b>Email: </b>
						<p className={"text-xs flex-1 pl-4 whitespace-pre-wrap"}>
							{selectedCustomer?.email}
						</p>
					</div>
					<div className="flex flex-row gap-2">
						<b>Address:</b>
						<p className={"text-xs whitespace-pre-wrap pl-1"}>
							{selectedCustomer?.address}
						</p>
					</div>
				</div>
				{/* <b>Customer:</b> */}
			</div>
			<List>
				<Divider className="border-1 border-black" />
				<ListItem className={"justify-between text-xs"}>
					<b>{"Name"}</b>
					<b>{"Price"}</b>
				</ListItem>
				<Divider className="border-1 border-black" />

				{Object.values(posProducts)?.map?.((product: any) => (
					<ListItem
						key={product?._id}
						className={"justify-between text-xs"}
					>
						<p className="text-xs whitespace-pre-wrap">
							<b>{`${product?.product?.category?.name} - ${product?.product?.subcategory?.name}`}</b>{" "}
							<br />
							{/* <span>{product?._id}</span> */}
							<span>{`${product?.product?.name} ${
								!!product.stitch && !product.stitch.tailor
									? `(Size - ${product.stitch.size})`
									: ""
							}`}</span>
						</p>
						<p>
							{product?.product?.price +
								(!!product.stitch && !product.stitch.tailor
									? product.stitch.fee
									: 0) || 0}
							৳
						</p>
					</ListItem>
				))}
			</List>

			<Divider className="border-1 border-black" />

			{/* <div className="flex flex-row justify-between"> */}
			<div className="flex flex-col items-end gap-2 m-4 text-xs">
				<div className="w-full flex flex-row items-center gap-4 justify-between ">
					<p>Subtotal: </p>
					<p>{others?.subTotal}৳</p>
				</div>
				{!!others?.stitchCost && (
					<div className="w-full flex flex-row items-center gap-4 justify-between">
						<p>Stitch Fee: </p>
						<p>{others?.stitchCost}৳</p>
					</div>
				)}
				<div className="w-full flex flex-row items-center gap-4 justify-between">
					<p>Discount: </p>
					<p>{others?.discount}৳</p>
				</div>
				{!!others?.exchange && (
					<div className="w-full flex flex-row items-center gap-4 justify-between">
						<p>Exchange: </p>
						<p>{others?.exchange}৳</p>
					</div>
				)}
				{!!others?.deliveryCharge && (
					<div className="w-full flex flex-row items-center gap-4 justify-between">
						<p>Delivery Charge: </p>
						<p>{others?.deliveryCharge}৳</p>
					</div>
				)}
				<div className="w-full flex flex-row items-center gap-4 justify-between">
					<p>Vat Inclusive (7.5%) : </p>
					<p>
						{parseFloat(
							`${
								((others?.subTotal +
									others?.stitchCost -
									others?.discount -
									others?.exchange) /
									(1 + 0.075)) *
								0.075
							}`
						).toFixed(2)}
						৳
					</p>
				</div>

				{isA5 ? (
					<>
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<p>Advance: </p>
							<p>{others?.paid}৳</p>
						</div>
						<div className="w-full flex flex-row items-center gap-4 justify-between border-t-2 border-black pt-2">
							<b>COD Amount: </b>

							<b>
								{parseFloat(
									`${
										others?.subTotal -
										others?.discount -
										others?.exchange +
										others?.deliveryCharge +
										others?.stitchCost -
										others?.paid
									}`
								).toFixed(2)}
								৳
							</b>
						</div>
					</>
				) : (
					<>
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<p>Amount Paid: </p>
							<p>{others?.paid}৳</p>
						</div>
						{!!(
							others?.subTotal -
							others?.discount -
							others?.exchange +
							others?.deliveryCharge +
							others?.stitchCost -
							others?.paid
						) && (
							<div className="w-full flex flex-row items-center gap-4 justify-between">
								<p>Amount Due: </p>
								<p>
									{others?.paid <
									others?.subTotal -
										others?.discount -
										others?.exchange +
										others?.deliveryCharge +
										others?.stitchCost
										? others?.subTotal -
										  others?.discount -
										  others?.exchange +
										  others?.deliveryCharge +
										  others?.stitchCost -
										  others?.paid
										: "0"}
									৳
								</p>
							</div>
						)}
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<p>Mode of Payment: </p>
							<b className="whitespace-pre-wrap">
								{Array.from(
									others?.transactions || [],
									(t: any) => t.method
								).join(", ")}
							</b>
						</div>
						<div className="w-full flex flex-row items-center gap-4 justify-between border-t-2 border-black pt-2">
							<b>Total: </b>
							<b>
								{parseFloat(
									`${
										others?.subTotal -
										others?.discount -
										others.exchange +
										others.deliveryCharge +
										others?.stitchCost
									}`
								).toFixed(2)}
								৳
							</b>
						</div>
						{!!(others?.paid >
						others?.subTotal -
							others?.discount -
							others.exchange +
							others.deliveryCharge +
							others?.stitchCost
							? others?.paid -
							  (others?.subTotal -
									others?.discount -
									others.exchange +
									others.deliveryCharge +
									others?.stitchCost)
							: 0) && (
							<div className="w-full flex flex-row items-center gap-4 justify-between">
								<p>Changed Amount : </p>
								<p>
									{others?.paid >
									others?.subTotal -
										others?.discount -
										others.exchange +
										others.deliveryCharge +
										others?.stitchCost
										? others?.paid -
										  (others?.subTotal -
												others?.discount -
												others.exchange +
												others.deliveryCharge +
												others?.stitchCost)
										: "0"}
									৳
								</p>
							</div>
						)}
					</>
				)}
			</div>
			{/* </div> */}
			<div className=" flex flex-col items-center justify-center gap-1 mt-2">
				{/* <b> */}
				<Typography
					variant="caption"
					fontWeight={400}
					className="text-center "
				>
					T&C : All prices are inclusive to VAT.
				</Typography>
				{/* <Typography variant="body2" fontWeight={600}>
          Thank you for shopping with us
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
          className="text-center break-all mx-6"
        >
          Scan the QR code below <br />
          and <br />
          follow us on facebook
        </Typography>

        <Avatar
          src={"/fascino-qr.svg"}
          variant={"square"}
          sx={{
            height: "120px",
            width: "120px",
            background: "transparent",
            borderColor: "none",
          }}
        /> */}
				{isA5 ? (
					<>
						<div className="border border-slate-800 w-full mt-2">
							<Typography
								variant="body1"
								fontWeight={600}
								className="text-center break-all"
							>
								We Do Not Offer Exchange, Refund & Color Gurantee
							</Typography>
						</div>
					</>
				) : (
					<>
						<div className="border border-slate-800 w-64 mt-2">
							<Typography
								variant="body1"
								fontWeight={600}
								className="text-center break-all"
							>
								No Return, No Exchange
							</Typography>
						</div>
					</>
				)}
			</div>
		</Box>
	);
};

export default POS;
