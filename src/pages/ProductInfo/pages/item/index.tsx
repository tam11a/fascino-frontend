import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import {
	usePaginate,
	useToggle,
	//  useToggle
} from "@tam11a/react-use-hooks";
// import CreateBranch from "./components/CreateBranch";
// import BranchColumn from "./components/BranchColumn";
// import { useGetBranch } from "@/queries/branch";
import { BsSearch } from "react-icons/bs";
import { FloatButton, Input, Spin, Card, Statistic } from "antd";
import Iconify from "@components/iconify";
import ItemColumn from "./components/ItemColumn";
import { useGetItem } from "@/queries/item";
import { useGetProductReportById } from "@/queries/products";
import { useParams } from "react-router-dom";
import FilterDrawer from "./components/FilterDrawer";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-jsbarcode";
import ItemDrawer from "./components/ItemDrawer";
import AddItems from "./components/AddItems";
const DataTable = React.lazy(() => import("@/components/Datatable"));

const Item: React.FC = () => {
	const { pid } = useParams();
	const {
		search,
		setSearch,
		getQueryParams,
		limit,
		setLimit,
		page,
		setPage,
		setFilterField,
		watch,
	} = usePaginate({
		defaultParams: {
			filters: {
				product: pid || "",
			},
			limit: 50,
		},
	});

	const [rowSelectionModel, setRowSelectionModel] =
		React.useState<GridSelectionModel>([]);

	const { data, isLoading } = useGetItem(getQueryParams());
	const { state: open, toggleState: onClose } = useToggle(false);

	const { state: openFilter, toggleState: onCloseFilter } = useToggle(false);
	const { state: openItems, toggleState: onCloseItem } = useToggle(false);

	const printRef = React.useRef(null);

	const { data: reportData, isLoading: isReportLoading } =
		useGetProductReportById(pid);

	console.log(reportData?.data?.data);

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
							<Typography
								variant="subtitle1"
								fontWeight={700}
							>
								{/* {t("employee:EmployeeList")} */}
								Items
							</Typography>
						</div>
						<Input
							className="w-full sm:max-w-xs"
							placeholder="Search Item"
							suffix={<BsSearch />}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							style={{ width: "auto" }}
							size="large"
							allowClear
						/>
					</Grid>
					<Grid item>
						<Spin spinning={isReportLoading}>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
								{Object.entries(reportData?.data?.data || {})?.map((data) => (
									<Card
										bordered={true}
										className="border-slate-200 border-2 text-slate-900 font-semibold"
									>
										<Statistic
											title={data[0] || "Untitled"}
											value={`${data[1] || 0}`}
											// precision={2}
											// valueStyle={{ color: "" }}
											// prefix={<ArrowUpOutlined />}
											// suffix="%"
										/>
									</Card>
								))}
							</div>
						</Spin>
					</Grid>
					<Grid item>
						<DataTable
							columns={ItemColumn()}
							rows={data?.data?.data || []}
							isLoading={isLoading}
							paginationMode={"server"}
							getRowId={(r: any) => r?._id || r.id}
							rowCount={data?.data?.total || 0}
							page={page}
							onPageChange={setPage}
							pageSize={limit}
							onPageSizeChange={setLimit}
							checkboxSelection
							onSelectionModelChange={(
								newRowSelectionModel: GridSelectionModel
							) => {
								setRowSelectionModel(newRowSelectionModel);
							}}
							selectionModel={rowSelectionModel}
						/>
					</Grid>
				</Grid>

				<FloatButton.Group
					shape="square"
					className="bottom-20 sm:bottom-4"
				>
					<FloatButton
						icon={<Iconify icon={"material-symbols:filter-alt-outline"} />}
						onClick={() => onCloseFilter()}
					/>
					<FloatButton
						icon={<Iconify icon={"material-symbols:add"} />}
						onClick={() => onCloseItem()}
					/>
					{!!rowSelectionModel.length ? (
						<>
							<FloatButton
								icon={
									<Iconify
										icon={"mi:edit"}
										onClick={() => onClose()}
									/>
								}
							/>
							<FloatButton
								icon={
									<Iconify
										icon={"material-symbols:print-add-outline-rounded"}
									/>
								}
								onClick={() => handlePrint()}
							/>
						</>
					) : (
						""
					)}
				</FloatButton.Group>
				<ItemDrawer
					open={open}
					onClose={onClose}
					selectedRowData={rowSelectionModel}
				/>
				<FilterDrawer
					open={openFilter}
					onClose={onCloseFilter}
					watch={watch}
					setFilterField={setFilterField}
				/>
				<AddItems
					open={openItems}
					onClose={onCloseItem}
				/>
			</Container>
			<div style={{ display: "none" }}>
				<div ref={printRef}>
					{rowSelectionModel?.map?.((barid) => (
						<div key={barid}>
							<Barcode
								value={`${barid || ""}`}
								options={{
									// text: `${barid}${
									// 	itemData?.data?.data?.stitch
									// 		? `-${itemData?.data?.data?.stitch?.size}`
									// 		: ""
									// }`,
									width: 1,
									fontOptions: "bold",
									format: "CODE128",
									fontSize: 8,
									height: 50,
								}}
							/>
							<br />
							<br />
							<br />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Item;
