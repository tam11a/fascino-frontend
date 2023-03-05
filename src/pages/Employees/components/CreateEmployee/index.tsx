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
import { useCreateEmployee } from "@/queries/employees";
import useUser from "@/hooks/useUser";
import { message } from "@components/antd/message";
import useAreYouSure from "@/hooks/useAreYouSure";
import { useGetRoles } from "@/queries/role";
import { IRole } from "@pages/Roles/types";

const CreateEmployee: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const user = useUser();

  const { handleSubmit, control } = useForm({});
  const { mutateAsync: createEmployee, isLoading: employeeLoading } =
    useCreateEmployee();

  const { data: roleData, isLoading: isRoleLoading } = useGetRoles();

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Creating Employee..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        createEmployee({
          ...data,
          createdBy: user.userName,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Employee created successfully!");
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
              primary={"Employee"}
              secondary={`Create a New Employee Account`}
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
                <Label isRequired>First Name</Label>
                <Controller
                  control={control}
                  name={"firstName"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="First Name"
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
                <Label isRequired>Last Name</Label>
                <Controller
                  control={control}
                  name={"lastName"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      // className="w-1/2"
                      placeholder="Last Name"
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
              <div className="flex flex-col">
                <Label isRequired>Username</Label>
                <Controller
                  control={control}
                  name={"userName"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      placeholder="Username"
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
                      placeholder="Phone"
                      size="large"
                      autoComplete="new-phone"
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
              <div className="flex flex-col">
                <Label isRequired>Password</Label>
                <Controller
                  control={control}
                  name={"password"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input.Password
                      placeholder="Password"
                      autoComplete="new-password"
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
                <Label isRequired>Email</Label>
                <Controller
                  control={control}
                  name={"email"}
                  rules={{ required: true }}
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="flex flex-col">
                <Label isRequired>Role</Label>
                <Controller
                  control={control}
                  name={"role"}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    //
                    <Select
                      placeholder={"Role"}
                      size={"large"}
                      className="relative"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      options={roleData?.data?.data?.map((rd: IRole) => {
                        return {
                          value: rd._id,
                          label: rd.name,
                        };
                      })}
                      status={error ? "error" : ""}
                      loading={isRoleLoading}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col">
                <Label isRequired>Gender</Label>
                <Controller
                  control={control}
                  name={"gender"}
                  rules={{ required: true }}
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
                      loading={isRoleLoading}
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
              disabled={employeeLoading}
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

export default CreateEmployee;
