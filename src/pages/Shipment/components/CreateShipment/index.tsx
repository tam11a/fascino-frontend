import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Cascader, Input } from "antd";
import { MdClose } from "react-icons/md";
import Label from "@components/Label";
import handleResponse from "@/utilities/handleResponse";
import useUser from "@/hooks/useUser";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useCreateshipment } from "@/queries/shipment";

const CreateShipment: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const user = useUser();

  const { handleSubmit, control } = useForm({});
  const { mutateAsync: createShipment } = useCreateshipment();

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Shipment..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createShipment({
          ...data,
          createdBy: user.userName,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Shipment created successfully!");
      onClose();
    } else {
      message.error(res.message);
    }
  };

  const { contextHolder: closeContextHolder, open: openClose } = useAreYouSure({
    title: "WANT TO CLOSE?",
    okText: "Close Anyway",
    cancelText: "Cancel",
  });

  const handleClose = () =>
    openClose(
      onClose,
      <>
        You may have some unsaved changes which will be lost closing the dialog.
      </>
    );
  {
    ("");
  }
  return (
    <>
      {closeContextHolder}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "98vw !important",
            maxWidth: "560px !important",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className={"flex flex-row items-center justify-between"}>
            <ListItemText
              primary={"Shipment"}
              secondary={`Create a New Shipment`}
              primaryTypographyProps={{
                fontWeight: "700",
                color: "#000",
              }}
              className="p-0 m-0"
            />
            <IconButton size="small" onClick={handleClose}>
              <MdClose />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
              <div className="flex flex-col relative">
                <Label>Supplier Name</Label>
                <Controller
                  control={control}
                  name={"supplier"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Supplier Name"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-2 mt-2">
              <div>
                <Label isRequired>Product Name</Label>
                <Controller
                  control={control}
                  name={"product"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Product Name"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <Label isRequired>Weight</Label>
                <Controller
                  control={control}
                  name={"weight"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Weight"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
              <div>
                <Label isRequired>Shipment Cost</Label>
                <Controller
                  control={control}
                  name={"shipmentCost"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Shipment Cost"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <Label isRequired>Buying Price</Label>
                <Controller
                  control={control}
                  name={"buyingPrice"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Buying Price"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
              <div>
                <Label isRequired>Selling Price</Label>
                <Controller
                  control={control}
                  name={"sellPrice"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Sell Price"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <Label isRequired>Tax</Label>
                <Controller
                  control={control}
                  name={"tax"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Tax"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>

              <div>
                <Label isRequired>Supplier Commision</Label>
                <Controller
                  control={control}
                  name={"supplierCommision"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Supplier Commision"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
            </div>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant={"contained"}
              // disabled={createLoading}
              type={"submit"}
            >
              Create
            </Button>
            <Button variant={"outlined"} onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateShipment;
