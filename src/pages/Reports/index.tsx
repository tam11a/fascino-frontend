import React from "react";
import { Card, Divider, Select, Statistic } from "antd";
import { useGetBranch } from "@/queries/branch";
import { IOption } from "@/hooks/useCategory/type";
import { usePaginate } from "@tam11a/react-use-hooks";
import DatePicker from "@components/antd/DatePicker";
import moment from "moment";
import { useGetGlobalReport } from "@/queries/report";

const Sales: React.FC = () => {
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
	>(undefined);

	const { data: globalData, isLoading: isGlobalLoading } = useGetGlobalReport();

	console.log(globalData);

	return (
		<>
			<p className="py-4 font-semibold text-xl">All Reports</p>
			<div className="grid grid-cols-4 gap-2">
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="Total Sale (In Amount)"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="total sale (In Quantity)"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="Total Customer"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
			</div>
			<div className="grid grid-cols-2">
				<Divider orientation="left">
					<Select
						placeholder={"Select Your Branch"}
						allowClear
						showSearch
						bordered={false}
						defaultActiveFirstOption
						size="large"
						showArrow={false}
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
				</Divider>
				<Divider orientation="right">
					<div className="w-fit">
						<DatePicker.RangePicker
							bordered={false}
							// size={"large"}
							allowClear
							allowEmpty={[true, true]}
							className="w-fit"
							presets={[
								{
									label: "Today",
									value: [moment(), moment()],
								},
								{
									label: "Yesterday",
									value: [moment().add(-1, "days"), moment().add(-1, "days")],
								},
								{
									label: "Last 7 Days",
									value: [moment().add(-7, "days"), moment()],
								},
								{
									label: "Last 30 Days",
									value: [moment().add(-30, "days"), moment()],
								},
								{
									label: "Last 6 Months",
									value: [moment().add(-3, "months"), moment()],
								},
								{
									label: "Last 1 Year",
									value: [moment().add(-1, "year"), moment()],
								},
							]}
							onChange={(v) => {
								// setFilterField("range", [
								// 	v?.[0]
								// 		? moment(v?.[0]).startOf("day").toISOString()
								// 		: undefined,
								// 	v?.[1] ? moment(v?.[1]).endOf("day").toISOString() : undefined,
								// ]);
							}}
						/>
					</div>
				</Divider>
			</div>
			<div className="grid grid-cols-4 gap-2">
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="Total Sale (In Amount)"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="total sale (In Quantity)"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="Total Customer"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>{" "}
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="Total Delivery"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="Total Due"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
				<Card
					bordered={true}
					className="border-slate-400 text-slate-900 font-semibold"
				>
					<Statistic
						title="Top Salesman"
						value={11.28}
						// precision={2}
						valueStyle={{ color: "" }}
						// prefix={<ArrowUpOutlined />}
						// suffix="%"
					/>
				</Card>
			</div>
		</>
	);
};

export default Sales;
