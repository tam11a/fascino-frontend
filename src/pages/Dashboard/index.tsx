import React from "react";
import DashboardFallback from "@components/DashboardFallback";
import { AccessMargin } from "@tam11a/react-use-access";
import defaultPermissions from "@/utilities/defaultPermissions";
import { usePaginate } from "@tam11a/react-use-hooks";
import { useGetBranch } from "@/queries/branch";
import { IOption } from "@/hooks/useCategory/type";
import moment, { Moment } from "moment";
import { useGetRangeReport } from "@/queries/report";
import { Card, Divider, Select, Spin, Statistic } from "antd";
// import DatePicker from "@components/antd/DatePicker";
import DataTable from "@components/Datatable";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Iconify from "@components/iconify";
import SalesmanColumn from "@pages/Reports/components/SalesmanColumn";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const Dashboard: React.FC = () => {
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
  const [range, _setRange] = React.useState<Moment[]>([moment(), moment()]);
  // const { data: globalData, isLoading: isGlobalLoading } = useGetGlobalReport();
  const { data: rangeData, isLoading: isRangeLoading } = useGetRangeReport({
    branch: selectedBranch?.value,
    fromDate: range?.[0]?.startOf("day").toISOString(),
    toDate: range?.[1]?.endOf("day").toISOString(),
  });

  return (
    <AccessMargin
      to={defaultPermissions.DASHBOARD}
      fallback={<DashboardFallback />}
    >
      <div className="py-3 px-5">
        <div className="flex flex-row justify-between items-center">
          <p className="py-4 font-semibold text-xl">Daily Reports</p>
          <span className="flex gap-4">
            <Link to="/app/pos">
              <Button
                className="text-slate-700"
                variant="contained"
                startIcon={<Iconify icon={"fontisto:shopping-pos-machine"} />}
              >
                POS
              </Button>
            </Link>
            <span>
              <Link to="/app/branch/64d23b54498a938958a2fcea/pettycash">
                <Button
                  className="text-slate-700 hover:underline"
                  startIcon={<Iconify icon={"game-icons:cash"} />}
                >
                  Dhanmondi Petty Cash
                </Button>
              </Link>
              <Link to="/app/branch/64d23b88498a938958a2fd34/pettycash">
                <Button
                  className="text-slate-700 hover:underline"
                  startIcon={<Iconify icon={"game-icons:cash"} />}
                >
                  Mirpur Petty Cash
                </Button>
              </Link>
            </span>
          </span>
        </div>
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
            <div className="w-fit"></div>
          </Divider>
        </div>
        <Spin spinning={isRangeLoading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <Card
              bordered={true}
              className="border-slate-200 border-2 text-slate-900 font-semibold"
            >
              <Statistic
                title="New Order"
                value={rangeData?.data?.newOrders || 0}
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
                title="New Customer"
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
                title="Total Sales"
                value={rangeData?.data?.totalSales || 0}
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
                title="Total Due"
                value={rangeData?.data?.totalDue || 0}
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
                title="Petty Cash"
                value={rangeData?.data?.totalPrttyCash || 0}
                // precision={2}
                valueStyle={{ color: "" }}
                // prefix={<ArrowUpOutlined />}
                // suffix="%"
              />
            </Card>
          </div>
        </Spin>

        <Spin spinning={isRangeLoading}>
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
        <p className="text-xl font-bold mb-4 mt-6 underline text-center">
          Best Sales Person
        </p>

        <DataTable
          // className="col-span-3"
          // columns={[]}
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
            <PieChart width={400} height={400}>
              <Pie
                dataKey="percentage"
                data={rangeData?.data?.typeWisePercentage || []}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                fill="#8884d8"
                labelLine={true}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AccessMargin>
  );
};

export default Dashboard;
