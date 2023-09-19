import { useGetBranch } from "@/queries/branch";
import { useGetCustomers } from "@/queries/customer";
import { useGetEmployees } from "@/queries/employees";
import Iconify from "@components/iconify";
import {
  Divider,
  Drawer,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Input, Select } from "antd";
import React from "react";

const FilterDrawer: React.FC<{
  setFilterField: (key: string, value: any) => void;
  watch: (key: any) => string | undefined;
  open: boolean;
  onClose: () => void;
}> = ({ setFilterField, watch, open, onClose }) => {
  const { search, setSearch, getQueryParams } = usePaginate();
  const { data: CustomerData } = useGetCustomers(getQueryParams());
  const { data: BranchData } = useGetBranch(getQueryParams());
  const { data: EmployeeData } = useGetEmployees(getQueryParams());
  console.log(BranchData);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        className: "w-[95vw] max-w-[320px]",
      }}
    >
      <div className="flex flex-row items-center justify-between p-2 px-6">
        <ListItemText
          primary={"Filter"}
          secondary={"Based on different parameters"}
        />

        <IconButton size={"small"} onClick={onClose}>
          <Iconify icon={"ci:close-md"} />
        </IconButton>
      </div>
      <Divider className="my-1" />
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Customer</Typography>
        <Select
          placeholder={"Select customer"}
          className="w-full"
          value={watch("customer")}
          allowClear
          onChange={(v) => setFilterField("customer", v)}
          options={
            CustomerData?.data?.data?.map((cd: any) => {
              return {
                value: cd?._id,
                label: cd?.name,
              };
            }) || []
          }
          showSearch
          filterOption={false}
          searchValue={search}
          onSearch={(v) => setSearch(v)}
          onClear={() => setFilterField("customer", undefined)}
        />
      </div>
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Branch</Typography>
        <Select
          placeholder={"Select Branch"}
          className="w-full"
          value={watch("branch")}
          allowClear
          onChange={(v) => setFilterField("branch", v)}
          options={
            BranchData?.data?.data?.map((cd: any) => {
              return {
                value: cd?._id,
                label: cd?.name,
              };
            }) || []
          }
          showSearch
          filterOption={false}
          searchValue={search}
          onSearch={(v) => setSearch(v)}
          onClear={() => setFilterField("customer", undefined)}
        />
      </div>
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Salesman</Typography>
        <Select
          placeholder={"Select Salesman"}
          className="w-full"
          value={watch("salesman")}
          allowClear
          onChange={(v) => setFilterField("salesman", v)}
          options={
            EmployeeData?.data?.data?.map((ed: any) => {
              return {
                value: ed?._id,
                label: ed?.fullName,
              };
            }) || []
          }
          showSearch
          filterOption={false}
          searchValue={search}
          onSearch={(v) => setSearch(v)}
          onClear={() => setFilterField("salesman", undefined)}
        />
      </div>
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Sale Type</Typography>
        <Select
          placeholder={"Select Type"}
          className="w-full"
          value={watch("type")}
          allowClear
          onChange={(v) => setFilterField("type", v)}
          options={
            [
              { value: "online", label: "Online" },
              { value: "offline", label: "Offline" },
            ] || []
          }
          showSearch
          filterOption={false}
          searchValue={search}
          onSearch={(v) => setSearch(v)}
          onClear={() => setFilterField("type", undefined)}
        />
      </div>
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Due</Typography>
        <Input
          placeholder={"Input minimum due"}
          className="w-full"
          value={watch("minDue")}
          allowClear
          onChange={(v) => setFilterField("minDue", v.target.value)}
        />
      </div>
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Mfs</Typography>

        <Select
          value={watch("mfs")}
          dropdownMatchSelectWidth={false}
          className="w-full"
          onChange={(v) => setFilterField("mfs", v)}
          onClear={() => setFilterField("mfs", undefined)}
          placeholder={"Select a mfs"}
        >
          <Select.Option value="Cash">Cash</Select.Option>
          <Select.Option value="Card">Card</Select.Option>
          <Select.Option value="bKash">bKash</Select.Option>
          <Select.Option value="Nagad">Nagad</Select.Option>
          <Select.Option value="Rocket">Rocket</Select.Option>
          <Select.Option value="COD">COD</Select.Option>
        </Select>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
