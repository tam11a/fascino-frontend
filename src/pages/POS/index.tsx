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
} from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import { Badge, FloatButton, Select } from "antd";
import React from "react";
import { useGetCustomers } from "@/queries/customer";
import CreateCustomer from "@pages/Customer/components/CreateCustomer";

const POS: React.FC = () => {
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
			}))
		);
	}, [branchData]);

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

	console.log(selectedCustomer);

	return (
		<>
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
						onClear={() => setBranchSearch("")}
						onSearch={(v) => setBranchSearch(v)}
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
					<Badge count={12}>
						<FloatButton icon={<Iconify icon="game-icons:sewing-machine" />} />
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
							className="relative top-0 left-0"
							shape="square"
						>
							<FloatButton icon={<Iconify icon="ph:barcode-duotone" />} />
						</FloatButton.Group>
					</div>
					<Avatar
						src={"/boxs.svg"}
						variant="square"
						className="w-9/12 max-w-md h-auto mx-auto"
					/>
				</div>
				<Divider
					flexItem
					orientation="vertical"
					className="border-2 border-dashed border-slate-100"
				/>
				<div className="min-w-full md:min-w-[370px] relative">
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
									{selectedCustomer?.Email || "N/A"}
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
				</div>
			</div>
			{/* </Container> */}
		</>
	);
};

export default POS;
