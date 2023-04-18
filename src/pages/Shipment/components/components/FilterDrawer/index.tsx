import { useGetCategories } from "@/queries/category";
import { useGetSubcategories } from "@/queries/subcategory";
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
  const { getQueryParams } = usePaginate();
  const { data: subCatData } = useGetSubcategories(getQueryParams());
  const { data: CatData } = useGetCategories(getQueryParams());
  // console.log(data);
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
        <Typography variant="overline">Filter category</Typography>
        <Select
          placeholder={"Select category"}
          className="w-full"
          value={watch("category")}
          allowClear
          onChange={(v) => setFilterField("category", v)}
          options={CatData?.data?.data?.map((cd: any) => {
            return {
              value: cd?._id,
              label: cd?.name,
            };
          })}
        />
      </div>
      <div className="p-2 px-6">
        <Typography variant="overline">Filter Subcategory</Typography>
        <Select
          placeholder={"Select Subcategory"}
          className="w-full"
          value={watch("subcategory")}
          allowClear
          onChange={(v) => setFilterField("subcategory", v)}
          options={subCatData?.data?.data?.map((sd: any) => {
            return {
              value: sd?._id,
              label: sd?.name,
            };
          })}
        />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
