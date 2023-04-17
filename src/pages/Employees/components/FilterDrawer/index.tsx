import Iconify from "@components/iconify";
import {
  Divider,
  Drawer,
  IconButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Select } from "antd";
import React from "react";

const FilterDrawer: React.FC<{
  setFilterField: (key: string, value: any) => void;
  watch: (key: any) => string | undefined;
  open: boolean;
  onClose: () => void;
}> = ({ setFilterField, watch, open, onClose }) => {
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
        <Typography variant="overline">Select Gender</Typography>
        <Select
          placeholder={"Filter Gender"}
          className="w-full"
          value={watch("gender")}
          allowClear
          onChange={(v) => setFilterField("gender", v)}
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
            {
              label: "Others",
              value: "others",
            },
          ]}
        />
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
