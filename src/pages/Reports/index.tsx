import React from "react";
import { Card, Divider, Select, Spin, Statistic } from "antd";
import { useGetBranch } from "@/queries/branch";
import { IOption } from "@/hooks/useCategory/type";
import { usePaginate } from "@tam11a/react-use-hooks";
import DatePicker from "@components/antd/DatePicker";
import moment, { Moment } from "moment";
import { useGetGlobalReport, useGetRangeReport } from "@/queries/report";
import DataTable from "@components/Datatable";
import SalesmanColumn from "./components/SalesmanColumn";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const Sales: React.FC = () => {
  const { limit, setLimit, page, setPage } = usePaginate();
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
  const [range, setRange] = React.useState<Moment[]>([moment(), moment()]);
  const { data: globalData, isLoading: isGlobalLoading } = useGetGlobalReport();
  const { data: rangeData, isLoading: isRangeLoading } = useGetRangeReport({
    branch: selectedBranch?.value,
    fromDate: range?.[0]?.startOf("day").toISOString(),
    toDate: range?.[1]?.endOf("day").toISOString(),
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <AccessMargin to={defaultPermissions.SALES} defaultFallback>
      <div className="py-3 px-5">
        <p className="py-4 font-semibold text-xl">All Reports</p>
        <Spin spinning={isGlobalLoading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Order"
                value={globalData?.data?.totalOrders || 0}
                // precision={2}
                // valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Customer"
                value={globalData?.data?.totalCustomers || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Employee"
                value={globalData?.data?.totalEmployees || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Branch"
                value={globalData?.data?.totalBranches || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Available Items"
                value={globalData?.data?.totalAvailableItems || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Uploaded Items"
                value={globalData?.data?.totalItems || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Uploaded Products"
                value={globalData?.data?.totalProducts || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </div>
        </Spin>
        <p className="pt-8 pb-4 font-semibold text-xl">Other Reports</p>
        <div className="grid grid-cols-2">
          <Divider orientation="left">
            <Select
              placeholder={"Select Your Branch"}
              allowClear
              showSearch
              // bordered={false}
              // size="large"
              showArrow={false}
              dropdownMatchSelectWidth={false}
              onClear={() => setSelectedBranch(undefined)}
              onSearch={(v) => setBranchSearch(v)}
              value={selectedBranch?.value}
              onSelect={(_v, o) => setSelectedBranch(o)}
              // onChange={(_v, o) => setSelectedBranch(o)}
              loading={isBranchLoading}
              options={branches}
              filterOption={false}
              className="min-w-[100px] text-left"
            />
          </Divider>
          <Divider orientation="right">
            <div className="w-fit">
              <DatePicker.RangePicker
                // bordered={false}
                defaultValue={[moment(), moment()]}
                // size={"large"}
                allowClear={false}
                allowEmpty={[false, false]}
                className="w-fit min-w-[250px]"
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
                  setRange([moment(v?.[0]), moment(v?.[1])]);
                }}
              />
            </div>
          </Divider>
        </div>
        <Spin spinning={isRangeLoading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="New Orders"
                value={rangeData?.data?.newOrders || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Sales"
                value={rangeData?.data?.totalSales || 0}
                precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                suffix="৳"
              />
            </Card>
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Due"
                value={rangeData?.data?.totalDue || 0}
                precision={2}
                valueStyle={{ color: "" }}
                suffix="৳"
              />
            </Card>

            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="New Customers"
                value={rangeData?.data?.newCustomers || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>

            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="Total Petty Cash"
                value={rangeData?.data?.totalPettyCash || 0}
                precision={2}
                valueStyle={{ color: "" }}
                suffix="৳"
              />
            </Card>
          </div>
          <Card
            bordered={true}
            className="border-slate-200 border-2 text-slate-900 font-medium my-2 min-h-[80px] text-center"
          >
            <p className="text-xl font-bold mb-4 underline">MFS Report</p>
            <div
              className={
                "flex flex-row items-center justify-center flex-wrap gap-5 text-lg"
              }
            >
              {Object.entries(rangeData?.data?.MFSReport || {})?.map((data) => (
                <p>
                  <b>{data[0]}</b>: {`${data[1]}`}
                </p>
              ))}
            </div>
          </Card>
        </Spin>
        <DataTable
          // className="col-span-3"
          columns={SalesmanColumn()}
          rows={rangeData?.data?.topSalesman || []}
          isLoading={isRangeLoading}
          getRowId={(r: any) => r?.salesman || r.id}
          page={page}
          onPageChange={setPage}
          pageSize={limit}
          onPageSizeChange={setLimit}
        />
        <div className="w-[450px] h-[450px]">
          <ResponsiveContainer width={"100%"} height="100%">
            <PieChart width={400} height={400} className="bg-orange-300">
              <Pie
                dataKey="percentage"
                data={rangeData?.data?.typeWisePercentage || []}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                fill="#8884d8"
                labelLine={true}
              >
                {rangeData?.data?.typeWisePercentage?.map(
                  (entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AccessMargin>
  );
};

export default Sales;
