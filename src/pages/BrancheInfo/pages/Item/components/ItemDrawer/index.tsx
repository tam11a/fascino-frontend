import { IOption } from "@/hooks/useCategory/type";
import { useGetBranch } from "@/queries/branch";
import { useUpdateItem } from "@/queries/item";
import handleResponse from "@/utilities/handleResponse";
import Iconify from "@components/iconify";
import { DrawerFooter } from "@layouts/App/components";
import {
  Drawer,
  Icon,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { usePaginate } from "@tam11a/react-use-hooks";
import { Select, message } from "antd";
import React from "react";

const ItemDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  selectedRowData: any;
}> = ({ open, onClose, selectedRowData }) => {
  const { setSearch: setBranchSearch, getQueryParams: getBranchQueryParams } =
    usePaginate({
      defaultParams: {
        limit: 10,
      },
    });

  const { data: branchData, isLoading: isBranchLoading } = useGetBranch(
    getBranchQueryParams()
  );
  const { mutateAsync: updateItem } = useUpdateItem();
  const [branches, setBranches] = React.useState<IOption[]>([]);

  React.useEffect(() => {
    if (!branchData) return;
    setBranches(
      Array.from(branchData?.data?.data || [], (d: any) => ({
        value: d?._id,
        label: d?.name,
        disabled: !d?.isActive,
      }))
    );
  }, [branchData]);

  const [selectedBranch, setSelectedBranch] = React.useState<
    IOption | undefined
  >(undefined);

  const onSubmit = async () => {
    message.open({
      type: "loading",
      content: "Updating Category Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateItem({
          data: {
            id: selectedRowData,
            branch: String(selectedBranch?.value),
          },
        }),
      [200]
    );
    message.destroy();
    if (res.status) {
      message.success("Information updated successfully!");
    } else {
      message.error(res.message);
    }
  };

  console.log(selectedBranch);

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      PaperProps={{ className: "w-[95vw] max-w-[400px]" }}
    >
      <ListItem>
        <ListItemText
          primary={"Bulk Update"}
          secondary={selectedRowData.length + " Items selected"}
        />
      </ListItem>
      <Divider
        sx={{
          mb: 1,
        }}
      />
      <Typography variant="subtitle1" className="mx-3 my-0 p-0">
        Branch
      </Typography>
      <div className="flex flex-row items-center rounded gap-2 mx-3 p-3 bg-slate-100">
        <Icon className="text-2xl">
          <Iconify icon={"mdi:shop-outline"} />
        </Icon>
        <Select
          bordered={false}
          placeholder={"Select a branch"}
          allowClear
          showSearch
          defaultActiveFirstOption
          size="large"
          onClear={() => setSelectedBranch(undefined)}
          onSearch={(v) => setBranchSearch(v)}
          value={selectedBranch?.value}
          onSelect={(_v, o) => setSelectedBranch(o || undefined)}
          loading={isBranchLoading}
          options={branches}
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
          <Button variant="outlined" fullWidth>
            Cancel
          </Button>
        </div>
      </DrawerFooter>
    </Drawer>
  );
};

export default ItemDrawer;
