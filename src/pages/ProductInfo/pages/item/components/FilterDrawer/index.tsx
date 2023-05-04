import { useGetBranch } from "@/queries/branch";
import { useGetSuppliers } from "@/queries/suppliers";
// import { useGetSuppliers } from "@/queries/suppliers";
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
  const { setSearch, getQueryParams } = usePaginate();
  const { data: branchData } = useGetBranch(getQueryParams());
  const { data: suppData } = useGetSuppliers(getQueryParams());
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
        <Typography variant="overline">Filter shipment</Typography>
        <Select
          placeholder={"Select Supplier"}
          className="w-full"
          value={watch("supplier")}
          allowClear
          onChange={(v) => setFilterField("supplier", v)}
          options={suppData?.data?.data?.map((sd: any) => {
            return {
              value: sd?._id,
              label: sd?.name,
            };
          })}
          showSearch
          onSearch={(v) => setSearch(v)}
          filterOption={false}
        />
      </div>
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Branch</Typography>
        <Select
          placeholder={"Select  Branch"}
          className="w-full"
          value={watch("branch")}
          allowClear
          onChange={(v) => setFilterField("branch", v)}
          options={branchData?.data?.data?.map((bd: any) => {
            console.log(bd);
            return {
              value: bd?._id,
              label: bd?.name,
            };
          })}
          showSearch
          onSearch={(v) => setSearch(v)}
          filterOption={false}
        />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
