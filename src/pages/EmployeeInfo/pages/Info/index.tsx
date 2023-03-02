import handleResponse from "@/utilities/handleResponse";
import { useGetEmployeesById, useUpdateEmployee } from "@/queries/employees";
import Label from "@components/Label";
import { Container } from "@mui/system";
import { Input, message, Select } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetRoles } from "@/queries/role/types";
import { IRole } from "@pages/Roles/Types/types";

const Info: React.FC = ({}) => {
  const { eid } = useParams();

  const { reset, handleSubmit, control } = useForm({});

  const { data: employeeData } = useGetEmployeesById(eid);
  const { mutateAsync: updateUser, isLoading: isSubmitting } =
    useUpdateEmployee();

  const { data: roleData, isLoading: isRoleLoading } = useGetRoles();
  console.log(roleData);

  React.useEffect(() => {
    if (!employeeData) return;
    reset({
      userName: employeeData?.data?.data?.userName,
      firstName: employeeData?.data?.data?.firstName,
      lastName: employeeData?.data?.data?.lastName,
      phone: employeeData?.data?.data?.phone,
      email: employeeData?.data?.data?.email,
      gender: employeeData?.data?.data?.gender,
      dob: employeeData?.data?.data?.dob,
      hireDate: employeeData?.data?.data?.hireDate,
      workHour: employeeData?.data?.data?.workHour,
      bank: employeeData?.data?.data?.bank,
      bKash: employeeData?.data?.data?.bKash,
      role: employeeData?.data?.data?.role?._id,
    });
  }, [employeeData]);

  const onSubmit = async (data: any) => {
    message.open({
      type: "loading",
      content: "Updating Employee Information..",
      duration: 0,
    });
    const res = await handleResponse(
      () =>
        updateUser({
          id: eid,
          data,
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
  return (
    <>
      <Container maxWidth={"xs"}>
        <form
          className="py-3 grid grid-cols-1 mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <Label>First Name</Label>
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
              <Label>Last Name</Label>
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
              <Label>Username</Label>
              <Controller
                control={control}
                name={"userName"}
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
              <Label>Phone</Label>
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
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label info="Email can't be updated">Email</Label>
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
                  disabled
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className="flex flex-col">
              <Label>Role</Label>
              <Controller
                control={control}
                name={"role"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  //
                  <Select
                    placeholder={"Role"}
                    size={"large"}
                    className="role"
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
                    disabled={isRoleLoading}
                  />
                )}
              />
            </div>
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
                    className="gender"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "others", label: "Others" },
                    ]}
                    status={error ? "error" : ""}
                    // disabled={isRoleLoading}
                    loading={isRoleLoading}
                  />
                )}
              />
            </div>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className="flex flex-col">
              <Label>Date Of Birth</Label>
              <Controller
                control={control}
                name={"dob"}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    placeholder="dob"
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
          </div> */}

          <Button
            variant="contained"
            size="large"
            fullWidth
            className="my-4"
            type="submit"
          >
            Update Information
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Info;
