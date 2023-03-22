import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
// import { AccessMargin } from "@tam11a/react-use-access";
// import defaultPermissions from "@/utilities/defaultPermissions";
import CustomerColumn from "./components/CustomerColumn";
import CreateCustomer from "./components/CreateCustomer";
import { useGetCustomers } from "@/queries/customer";
import BackButton from "@components/BackButton";
import { FloatButton, Input } from "antd";
import { BsSearch } from "react-icons/bs";
import Iconify from "@components/iconify";
// import { t } from "i18next";

const DataTable = React.lazy(() => import("@/components/Datatable"));

const Customer: React.FC = () => {
	const { search, setSearch, getQueryParams, limit, setLimit, page, setPage } =
		usePaginate();
	const { data, isLoading } = useGetCustomers(getQueryParams());
	const { state: open, toggleState: onClose } = useToggle(false);

	return (
		<>
			<Container
				maxWidth={"lg"}
				sx={{
					maxWidth: "1500px !important",
				}}
			>
				<Grid
					container
					rowGap={1}
					direction="column"
					marginTop={4}
				>
					<Grid className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
						<div className="flex flex-row items-center ">
							<BackButton />
							<Typography
								variant="subtitle1"
								fontWeight={700}
							>
								{/* {t("employee:EmployeeList")} */}
								Customers
							</Typography>
						</div>
						<Input
							className="w-full sm:max-w-xs"
							placeholder="Search Customers"
							suffix={<BsSearch />}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							style={{ width: "auto" }}
							size="large"
							allowClear
						/>
					</Grid>

					<Grid item>
						<DataTable
							columns={CustomerColumn()}
							rows={data?.data?.data || []}
							isLoading={isLoading}
							getRowId={(r: any) => r?._id || r.id}
							rowCount={data?.data?.total || 0}
							page={page}
							paginationMode={"server"}
							onPageChange={setPage}
							pageSize={limit}
							onPageSizeChange={setLimit}
						/>
					</Grid>
				</Grid>
				<FloatButton.Group
					shape="square"
					className="bottom-20 sm:bottom-4"
				>
					<FloatButton
						icon={<Iconify icon={"material-symbols:filter-alt-outline"} />}
					/>
					<FloatButton
						icon={<Iconify icon={"material-symbols:add"} />}
						onClick={() => onClose()}
					/>
				</FloatButton.Group>
				{/* Dialog Box */}
				<CreateCustomer
					open={open}
					onClose={onClose}
				/>
			</Container>
		</>
	);
};

export default Customer;
