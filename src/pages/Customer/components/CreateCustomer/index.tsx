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
import { Input, Select } from "antd";
import { MdClose } from "react-icons/md";
import Label from "@components/Label";
import handleResponse from "@/utilities/handleResponse";
import useUser from "@/hooks/useUser";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useCreateCustomer } from "@/queries/customer";

const CreateCustomer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const user = useUser();

  const { handleSubmit, control, getValues, setValue } = useForm({});
  const { mutateAsync: createCustomer, isLoading: createLoading } =
    useCreateCustomer();

  const reset = () => {
    Object.keys(getValues())?.map((field: string) =>
      setValue(field, undefined)
    );
  };

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Customer..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createCustomer({
          ...data,
          createdBy: user.userName,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Customer account created successfully!");
      reset();
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
              primary={"Customer"}
              secondary={`Create a New Customer Account`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col relative">
                <Label isRequired>Name</Label>
                <Controller
                  control={control}
                  name={"name"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Name"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <Label isRequired>Phone</Label>
                <Controller
                  control={control}
                  name={"phone"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      defaultValue={"+88"}
                      placeholder=" Phone"
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
            <div className="flex flex-col">
              <Label>Email</Label>
              <Controller
                control={control}
                name={"email"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="Email"
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col">
                <Label>Gender</Label>
                <Controller
                  control={control}
                  name={"gender"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      placeholder={"Gender"}
                      size={"large"}
                      className="gender relative"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "others", label: "Others" },
                      ]}
                      status={error ? "error" : ""}
                      // loading={isLoading}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <Label>Badge</Label>
                <Controller
                  control={control}
                  name={"badge"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Select
                      placeholder={"Badge"}
                      size={"large"}
                      className="gender relative"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      options={[
                        { value: "Premium", label: "Premium" },
                        { value: "Gold", label: "Gold" },
                        { value: "Silver", label: "Silver" },
                      ]}
                      status={error ? "error" : ""}
                      // loading={isLoading}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col">
                <Label>Division</Label>
                {/* <Controller
                  control={control}
                  name={"bank"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => ( */}
                <Input
                  placeholder="Division"
                  size="large"
                  // onChange={onChange}
                  // onBlur={onBlur}
                  // value={value}
                  // status={error ? "error" : ""}
                />
                {/* )}
                /> */}
              </div>
              <div className="flex flex-col">
                <Label>City</Label>
                {/* <Controller
                  control={control}
                  name={"bKash"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => ( */}
                <Input
                  placeholder="City"
                  size="large"
                  // onChange={onChange}
                  // onBlur={onBlur}
                  // value={value}
                  // status={error ? "error" : ""}
                />
                {/* )}
                /> */}
              </div>
            </div>
            <div className="flex flex-col">
              <Label>Address</Label>
              <Controller
                control={control}
                name={"address"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input.TextArea
                    placeholder="Enter address"
                    showCount
                    maxLength={1000}
                    autoSize={{ minRows: 4 }}
                    size="large"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={error ? "error" : ""}
                  />
                )}
              />
            </div>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              variant={"contained"}
              disabled={createLoading}
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

export default CreateCustomer;
