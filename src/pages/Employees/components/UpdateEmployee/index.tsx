import React from "react";
import useUser from "@/hooks/useUser";
import { message } from "@components/antd/message";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material";
import { Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
// import { useGetRoles } from "@queries/roles";
// import { IRole } from "@pages/Roles/types";
import handleResponse from "@/utilities/handleResponse";
import { useUpdateUserInfo } from "@/queries/auth";
// import { userInfoResolver } from "@/pages/Settings/pages/Personal/resolver";
// import { zodResolver } from "@hookform/resolvers/zod";
import { IEmployee } from "@pages/Employees/Types";
import Label from "@components/Label";

const UpdateEmployee: React.FC<IEmployee & { onClose: () => void }> = ({
  firstName,
  lastName,
  email,
  phone,
  role,
  onClose,
}) => {
  const user = useUser();

  //   const { data: roleData, isLoading: isRoleLoading } = useGetRoles(user._id);
  const { mutateAsync: updateUser, isLoading: isSubmitting } =
    useUpdateUserInfo();

  const { reset, handleSubmit, control } = useForm({
    // resolver: zodResolver(userInfoResolver),
  });

  React.useEffect(() => {
    reset({
      phone,
      firstName,
      lastName,
      email,
      roleID: role._id,
    });
  }, []);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Employee Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          userId: data?._id,
          data,
        }),
      [201]
    );
    message.destroy();
    if (res.status) {
      message.success("Information updated successfully!");
      onClose();
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
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
              secondary={`Update Employee Information`}
              primaryTypographyProps={{
                fontWeight: "700",
                color: "#000",
              }}
              className="p-0 m-0"
            />
            <IconButton size="small" onClick={onClose}>
              <MdClose />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <Label isRequired>First Name</Label>
                <Controller
                  control={control}
                  name={"firstName"}
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
                <Label info="Phone number can't be updated">Phone</Label>
                <Controller
                  control={control}
                  name={"phone"}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Input
                      placeholder="Phone"
                      size="large"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      status={error ? "error" : ""}
                      disabled
                    />
                  )}
                />
              </div>

              <div className="flex flex-col">
                <Label isRequired>Email</Label>
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
            </div>
            <div className="flex flex-col">
              <Label isRequired>Role</Label>
              <Controller
                control={control}
                name={"roleID"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  //
                  <Select
                    placeholder={"Role"}
                    size={"large"}
                    className="srole"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    // options={roleData?.data?.map((rd: IRole) => {
                    //   return {
                    //     value: rd.roleID,
                    //     label: rd.roleName?.split?.(" ### ")[0],
                    //   };
                    // })}
                    status={error ? "error" : ""}
                    // disabled={isRoleLoading}
                  />
                )}
              />
            </div>
            <div>
              <Label isRequired>Address</Label>
              <Controller
                control={control}
                name={"address"}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input.TextArea
                    placeholder="Address"
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
              disabled={isSubmitting}
              type={"submit"}
            >
              Update
            </Button>
            <Button variant={"outlined"} onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateEmployee;
