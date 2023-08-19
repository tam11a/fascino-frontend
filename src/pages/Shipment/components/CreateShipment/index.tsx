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
import useSupplier from "@/hooks/useSupplier";
import useProduct from "@/hooks/useProduct";

const CreateShipment: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const user = useUser();

  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      supplier: null,
      product: null,
      quantity: 0,
      weight: 0,
      weightCost: 0,
      buyingPrice: 0,
      buyingDiscount: 0,
      supplierCommision: 0,
      stitch: {
        fee: 0,
        size: null,
      },
    },
  });
  const { mutateAsync: createShipment } = useCreateshipment();
  const { Supplier, isSupplierLoading, searchSupplier } = useSupplier();
  const { product, isproductLoading, searchProduct } = useProduct();

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
          // weight: data.weight || 0,
          stitch: data.stitch.size || data.stitch.fee ? data.stitch : undefined,
          createdBy: user.userName,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Shipment created successfully!");
      reset();
      reset({
        supplier: null,
        product: null,
        quantity: 0,
        weight: 0,
        weightCost: 0,
        buyingPrice: 0,
        buyingDiscount: 0,
        supplierCommision: 0,
        stitch: {
          fee: 0,
          size: null,
        },
      });
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
        <form
          onSubmit={handleSubmit(onSubmit, (e) => {
            console.log(e);
          })}
        >
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
                <Label isRequired>Supplier Name</Label>
                <Controller
                  control={control}
                  name={"supplier"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Cascader
                      size="large"
                      placeholder="Search supplier..."
                      allowClear={false}
                      value={value || undefined}
                      showSearch
                      options={Supplier}
                      onSearch={searchSupplier}
                      loading={isSupplierLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                      className="w-full"
                      status={error ? "error" : ""}
                      //   disabled={isLoading}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <Label isRequired>Product Name</Label>
                <Controller
                  control={control}
                  name={"product"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Cascader
                      size="large"
                      placeholder="Search product..."
                      allowClear={false}
                      value={value || undefined}
                      showSearch
                      options={product}
                      onSearch={searchProduct}
                      loading={isproductLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                      className="w-full"
                      status={error ? "error" : ""}
                      //   disabled={isLoading}
                    />
                  )}
                />
              </div>
              <div>
                <Label isRequired>Quantity</Label>
                <Controller
                  control={control}
                  name={"quantity"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Quantity Number"
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <div>
                <Label>Weight(gm) </Label>
                <Controller
                  control={control}
                  name={"weight"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      // defaultValue={"0"}
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
                <Label>Unit Cost</Label>
                <Controller
                  control={control}
                  name={"weightCost"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Unit Cost"
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
                <Label>Weight Cost</Label>
                <Input
                  // className="w-1/2"
                  placeholder="Weight Cost"
                  size="large"
                  value={watch("weight") * watch("weightCost") || 0}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <div>
                <Label>Buying Price</Label>
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
                <Label>Discount</Label>
                <Controller
                  control={control}
                  name={"buyingDiscount"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Discount"
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
                <Label>Price</Label>
                <Input
                  // className="w-1/2"
                  placeholder="Shipment Cost"
                  size="large"
                  value={watch("buyingPrice") - watch("buyingDiscount") || 0}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {/* <div>
                <Label>Tax</Label>
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
              </div> */}

              <div>
                <Label>Supplier Commission</Label>
                <Controller
                  control={control}
                  name={"supplierCommision"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Enter Supplier Commission"
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
            <div>
              <Label>Stitch</Label>
              <Input.Group>
                <Controller
                  control={control}
                  name={"stitch.size"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      className="w-1/2"
                      placeholder="Size"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || undefined}
                      status={error ? "error" : ""}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={"stitch.fee"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      className="w-1/2"
                      placeholder="Fee"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || undefined}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </Input.Group>
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
