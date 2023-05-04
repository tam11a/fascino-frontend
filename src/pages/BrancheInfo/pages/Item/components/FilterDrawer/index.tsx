import { useGetProducts } from "@/queries/products";
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
  // getQueryParams: any;
}> = ({ setFilterField, watch, open, onClose }) => {
  const { setSearch, getQueryParams } = usePaginate();
  const { data } = useGetProducts(getQueryParams());
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
        <Typography variant="overline">Select Product</Typography>
        <Select
          placeholder={"Filter Product"}
          className="w-full"
          value={watch("product")}
          allowClear
          onChange={(v) => setFilterField("product", v)}
          options={data?.data?.data?.map((pd: any) => {
            return {
              value: pd?._id,
              label: pd?.name,
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
