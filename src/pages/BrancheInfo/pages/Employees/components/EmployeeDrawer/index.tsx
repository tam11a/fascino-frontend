import { IOption } from "@/hooks/useCategory/type";
import { useUpdateJunction } from "@/queries/branch";
import { useGetEmployees } from "@/queries/employees";
import handleResponse from "@/utilities/handleResponse";
import Iconify from "@components/iconify";
import { DrawerFooter } from "@layouts/App/components";
import {
  Drawer,
  Icon,
  Button,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Select, message } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const EmployeeDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { setSearch: setBranchSearch, getQueryParams: getBranchQueryParams } =
    usePaginate({
      defaultParams: {
        limit: 10,
      },
    });

  const { bid } = useParams();

  const { data: employeeData, isLoading: isEmployeeLoading } = useGetEmployees(
    getBranchQueryParams()
  );
  const { mutateAsync: updateJunction } = useUpdateJunction();
  const [employees, setEmployees] = React.useState<IOption[]>([]);

  React.useEffect(() => {
    if (!employeeData) return;
    setEmployees(
      Array.from(employeeData?.data?.data || [], (d: any) => ({
        value: d?._id,
        label: d?.fullName,
        disabled: !d?.isActive,
      }))
    );
  }, [employeeData]);

  const [selectedEmployee, setSelectedEmployee] = React.useState<string[]>();

  const onSubmit = async () => {
    message.open({
      type: "loading",
      content: "Updating Branch Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateJunction({
          id: bid,
          params: {
            admins: selectedEmployee?.join(",") || "",
          },
        }),
      [200]
    );
    message.destroy();
    if (res.status) {
      message.success("Information updated successfully!");
      onClose();
    } else {
      message.error(res.message);
    }
  };

  //   console.log(selectedEmployee);

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      PaperProps={{ className: "w-[95vw] max-w-[400px]" }}
    >
      <div className="flex flex-row items-center justify-between p-2 px-6">
        <ListItemText
          primary={"Employees"}
          secondary={"Select employees to add in branch"}
        />
        <IconButton size={"small"} onClick={onClose}>
          <Iconify icon={"ci:close-md"} />
        </IconButton>
      </div>
      <Divider className="my-1" />
      <div className="flex flex-row items-center rounded gap-2 m-3 p-3 bg-slate-100">
        <Icon className="text-2xl">
          <Iconify icon={"clarity:employee-line"} />
        </Icon>
        <Select
          bordered={false}
          placeholder={"Search Employees"}
          mode="multiple"
          style={{ width: "100%" }}
          optionLabelProp="label"
          allowClear
          showSearch
          defaultActiveFirstOption
          size="large"
          onSearch={(v) => setBranchSearch(v)}
          onChange={(_v, o) => {
            setSelectedEmployee(_v);
          }}
          loading={isEmployeeLoading}
          options={employees}
          filterOption={false}
          className="min-w-sm"
        />
      </div>
      <DrawerFooter
        sx={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <div className="flex flex-row justify-between w-full gap-2">
          <Button variant="contained" fullWidth onClick={() => onSubmit()}>
            Update
          </Button>
          <Button variant="outlined" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  );
};

export default EmployeeDrawer;
