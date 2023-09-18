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
import { Select } from "antd";
import React from "react";

const FilterDrawer: React.FC<{
  setFilterField: (key: string, value: any) => void;
  watch: (key: any) => string | undefined;
  open: boolean;
  onClose: () => void;
}> = ({ setFilterField, watch, open, onClose }) => {
  const { search, setSearch, getQueryParams } = usePaginate();
  const { data: CustomerData } = useGetCustomers(getQueryParams());
  const { data: EmployeeData } = useGetEmployees(getQueryParams());
  console.log(EmployeeData);

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
    </Drawer>
  );
};

export default FilterDrawer;
