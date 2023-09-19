import React from "react";
import { Card, DatePicker, Divider, Input, Select, Statistic } from "antd";
import { useGetBranch } from "@/queries/branch";
import { IOption } from "@/hooks/useCategory/type";
import { usePaginate } from "@tam11a/react-use-hooks";

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
  >(
    localStorage.getItem("sbpos")
      ? JSON.parse(localStorage.getItem("sbpos") || "{}")
      : undefined
  );

  React.useEffect(() => {
    if (selectedBranch)
      localStorage.setItem("sbpos", JSON.stringify(selectedBranch));
    else localStorage.removeItem("sbpos");
  }, [selectedBranch]);
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
      <Divider orientation="left"></Divider>
      <div className="flex flex-row justify-between pb-4">
        <Select
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
        <DatePicker.RangePicker
          bordered={false}
          size={"large"}
          allowClear
          allowEmpty={[false, false]}
          className="grid-cols-2"
        />
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
